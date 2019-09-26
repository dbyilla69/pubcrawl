import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Video from '../publisher/Video';

export const VIDEO_WHERE_ID_QUERY = gql`
    query VIDEO_WHERE_ID_QUERY($publisher_id: Int!, $publisher_name: String!, $video_id: String!) {
        videoWhereId(publisher_id: $publisher_id, publisher_name: $publisher_name, video_id: $video_id) {
            id
            title
            url
            thumbnail_url
            publisher_id
            pub_video_id
            uploader
            description
            publish_date
            is_recommendable
            is_manual_recommendable
            external_data
            item_type
            has_expired
            was_crawled
            update_time
            start_date
            create_time
            crawlerAuditData {
                id
                publisher
                pub_item_id
                item_type
                first_successful_processing
                last_successful_processing
                last_upload
                error_message
                nonrecommendable_reason
                source
                last_crawl_reason
                first_nonrecommendable_time
            }
            crawlerInstructionsData {
                id
                lock_id
                lock_time
                num_strikes
                last_strike_date
                next_crawl
                next_crawl_reason
            }
            channelsData {
                id
                publisher_id
                channel
                display_ads_prob
                is_reports_visible
            }
        }
    }
`;

export default (props) => {
    const { loading, error, data } = useQuery(
        VIDEO_WHERE_ID_QUERY, {
        variables: {
            publisher_id: Number(props.pub_id),
            publisher_name: props.pub_name,
            video_id: props.video_id
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Looks like there was an issue! Make sure that the ID you are searching for is valid and that the video <strong><i>belongs to the publisher selected.</i></strong></p>;

    return (
        <div className="videos-container">
            {data && (
                <Video
                    vidData={data.videoWhereId}
                    channelsData={data.videoWhereId.channelsData}
                    auditData={data.videoWhereId.crawlerAuditData}
                    instructionData={data.videoWhereId.crawlerInstructionsData}
                    vid_selectors={props.vid_selectors}
                    channel_selectors={props.channel_selectors}
                    crawlaud_selectors={props.crawlaud_selectors}
                    crawlinstr_selectors={props.crawlinstr_selectors}
                    key={data.videoWhereId.id}
                />
            )}
        </div>
    );
}
