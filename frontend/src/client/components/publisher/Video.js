import React from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/stylesheets/video.scss';

function VideoSubSection(props) {
    return (
        <div className={`${props.name}-selectors`}>
            <p className={`${props.name}-header`}><b></b></p>
            {(props.name === "channels" && props.selectors["show_channels"])
                ? (<Table bordered striped>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>channel</th>
                            <th>is_reports_visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((channel,i) => (
                            <tr key={i}>
                                {(["id", "channel", "is_reports_visible"]).map((k,i) =>(
                                    k !== "__typename"
                                        ? <td key={i}>{String(channel[k])}</td>
                                        : null
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>)
                : Object.keys(props.data).map((k, i) => (
                    props.selectors[k]
                        ? <p className="videoAdd" key={i}><span class="videoAddHeader">{k}:</span><br/> {String(props.data[k])}</p>
                        : null
                ))
            }
        </div>
    )
}

function Video(props) {
    const v = props.vidData,
    chan = props.channelsData,
    aud = props.auditData,
    instr = props.instructionData;
    return (
      <div className="video">
        <div className="videoContainer">
          <div className="imageContainer">
            <img class="thumbnail-picture" src={v.thumbnail_url} alt="Avatar"/>
            <div class="overlay">
              {v.is_recommendable? <p>&#9989;</p> : <p>&#10060;</p>}
              {v.has_expired? <p>&#127859;</p> : <p>&#129370;</p>}
            </div>
          </div>
            <div class="video-info" >
              <h4>{v.title}</h4>
              <p>
                <span>ID: </span>
                <br/>
                {v.id}
              </p>
              <p>
                <span>URL: </span>
                <br/>
                {v.url}
              </p>
              <p>
                <span>THUMBNAIL: </span>
                <br/>
                {v.thumbnail_url}
              </p>
              <p>
                <span>Is recommendable? </span>
                <br/>
                {`${v.is_recommendable}`}
              </p>
              <p>
                <span>Has expired? </span>
                <br/>
                {`${v.has_expired}`}
              </p>
              {v.crawlerAuditData.nonrecommendable_reason && <p>{String(v.crawlerAuditData.nonrecommendable_reason)}</p>}
            </div>
            <div class="add-info">
              <VideoSubSection
                  data={v}
                  selectors={props.vid_selectors}
                  name="videos"
              />
              <VideoSubSection
                  data={chan}
                  selectors={props.channel_selectors}
                  name="channels"
              />
              <VideoSubSection
                  data={aud}
                  selectors={props.crawlaud_selectors}
                  name="audit"
              />
              <VideoSubSection
                  data={instr}
                  selectors={props.crawlinstr_selectors}
                  name="instruction"
              />
            </div>
          </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default Video;
