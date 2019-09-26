import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Video from '../publisher/Video';

export const VIDEOS_WHERE_URL_QUERY = gql`
    query VIDEOS_WHERE_URL_QUERY($publisher_id: Int!, $publisher_name: String!, $video_url: String!) {
        videosWhereUrl(publisher_id: $publisher_id, publisher_name: $publisher_name, video_url: $video_url) {
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
        VIDEOS_WHERE_URL_QUERY, {
        variables: {
            publisher_id: Number(props.pub_id),
            publisher_name: props.pub_name,
            video_url: props.video_url
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) return <p>Loading... we got a lot of organic content to sift through here</p>;
    if (error) return <p>Something went wrong... try again!</p>;
    if (!data.videosWhereUrl.length) return <p>No matching videos found</p>

    return (
        <div className="videos-container">
            {data && data.videosWhereUrl.map(video => (
                <Video
                    vidData={video}
                    channelsData={video.channelsData}
                    auditData={video.crawlerAuditData}
                    instructionData={video.crawlerInstructionsData}
                    vid_selectors={props.vid_selectors}
                    channel_selectors={props.channel_selectors}
                    crawlaud_selectors={props.crawlaud_selectors}
                    crawlinstr_selectors={props.crawlinstr_selectors}
                    key={video.id}
                />
            ))}
        </div>
    );
}
