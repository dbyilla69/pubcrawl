function makeEncodedUri({ rows, headers }) {
	const formattedRows = rows.map((row) => row.join()).join('\n');
	const csvContent = `data:text/csv;charset=utf-8,${headers.join()}\n${formattedRows}`;
	const encodedUri = encodeURI(csvContent);
	return encodedUri;
}

function getTrcHeaders(videos) {
	const skip = ['recrawlData'];
	const nested = [
		'metaData',
		'channelsData',
		'crawlerAuditData',
		'crawlerInstructionsData',
	];

	return Object.keys(videos[0]).filter(
		(key) => !skip.includes(key) && !nested.includes(key),
	);
}

function getCrawlerAuditHeaders(videos) {
	return Object.keys(videos[0].crawlerAuditData).map(
		(header) => `crawler.audit - ${header}`,
	);
}

function getCrawlerInstructionsHeaders(videos) {
	return Object.keys(videos[0].crawlerInstructionsData).map(
		(header) => `crawler.instructions - ${header}`,
	);
}

function getMetaDataHeaders(videos) {
	return videos.reduce((headers, video) => {
		const metaNames = video.metaData.map((meta) => meta.name);
		metaNames.forEach((metaName) => {
			const formatted = `meta - ${metaName}`;
			if (!headers.includes(formatted)) {
				headers.push(formatted);
			}
		});
		return headers;
	}, []);
}

function getChannelHeaders(videos) {
	const channelCounts = videos.map((video) => video.channelsData.length);
	const maxChannelCount = Math.max(...channelCounts);
	const videoWithChannels = videos.find(
		(video) => video.channelsData.length > 0,
	);
	const channelKeys = Object.keys(videoWithChannels.channelsData[0]);
	const channelHeaders = Array(maxChannelCount)
		.fill(1)
		.reduce((headers, _, idx) => {
			const newHeaders = channelKeys.map(
				(key) => `channel ${idx + 1} - ${key}`,
			);

			return [...headers, ...newHeaders];
		}, []);
	return channelHeaders;
}

function makeHeaders(videos) {
	const trcHeaders = getTrcHeaders(videos);
	const crawlerAuditHeaders = getCrawlerAuditHeaders(videos);
	const crawlerInstructionsHeaders = getCrawlerInstructionsHeaders(videos);
	const metaDataHeaders = getMetaDataHeaders(videos);
	const channelHeaders = getChannelHeaders(videos);

	return [
		...trcHeaders,
		...crawlerAuditHeaders,
		...crawlerInstructionsHeaders,
		...metaDataHeaders,
		...channelHeaders,
	];
}

function makeCrawlerRow({ header, video, table }) {
	const property = header.split(' - ')[1];
	return `"${video[table][property]}"`.replace(/#/g, '%23');
}

function makeMetaRow({ header, video }) {
	const metaName = header.split(' - ')[1];
	const found = video.metaData.find((meta) => meta.name === metaName);

	if (found) {
		const escaped = found.value.replace(/"/g, "'");
		return `"${escaped}"`.replace(/#/g, '%23');
	}

	return '';
}

function makeChannelRow({ header, video }) {
	const splitHeader = header.split(' - ');
	const property = splitHeader[1];
	const channelIdx = Number(splitHeader[0].split(' ')[1]) - 1;
	const foundChannel = video.channelsData[channelIdx];

	if (foundChannel) {
		return `"${foundChannel[property]}"`.replace(/#/g, '%23');
	}

	return '';
}

function makeRows({ videos, headers }) {
	/* eslint-disable */
	return videos.map((video) => {
		return headers.map((header) => {
			if (header.includes('crawler.instructions')) {
				return makeCrawlerRow({
					header,
					video,
					table: 'crawlerInstructionsData',
				});
			}

			if (header.includes('crawler.audit')) {
				return makeCrawlerRow({
					header,
					video,
					table: 'crawlerAuditData',
				});
			}

			if (header.includes('meta - ')) {
				return makeMetaRow({ header, video });
			}

			if (header.includes('channel ')) {
				return makeChannelRow({ header, video });
			}

			return `"${video[header]}"`.replace(/#/g, '%23');
		});
	});
	/* eslint-enable */
}

function makeCSVHref(videos) {
	const headers = makeHeaders(videos);
	const rows = makeRows({ videos, headers });
	return makeEncodedUri({ rows, headers });
}

export default makeCSVHref;
