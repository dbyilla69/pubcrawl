import React, { useState } from 'react';
import { FormControl, FormGroup, Col } from 'react-bootstrap';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

function Selector(props) {
    return (
        <FormGroup>
            <label>
                <input name={props.label} type="checkbox" checked={props.state} onChange={props.handleChng} />
                {props.label}
            </label>
        </FormGroup>
    )
}

function FilterSection(props) {
    const selectors = props.selectors;
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={props.k}>
                    {props.title}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.k}>
                <Card.Body>
                { Object.keys(selectors).map((name, i) => (
                    <Selector key={i} label={name} state={selectors[name]} handleChng={props.handleChng} />
                )) }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

function FiltersMenu(props) {
    const [id, setId] = useState("")
    const [url, setUrl] = useState("")
    const [recType, setRecType] = useState("BOTH")

    const handleSearch = (e) => {
        switch(e.target.name) {
            case 'id':
                props.updateVideoWhereId({ id, active: true })
                break
            case 'url':
                props.updateVideosWhereUrl({ url, active: true })
                break
            case 'rec':
                setRecType(e.target.value)
                props.updateRecommendableState(e.target.value)
                break
            default:
                return
        }
    }

    return (
        <Col md={3} style={{textAlign: "left"}}>
            <div className="eggThesaurus">
              <p>
                <br/>
                &#9989; = recommendable
                <br/>
                &#10060; = non recommendable
                <br/>
                &#127859; = has expired
                <br/>
                &#129370; = has not expired
              </p>
            </div>
            <h5>Search Filters:</h5>
            <div className="filters">
                <button name="all-videos" className="all-videos" disabled={props.resetSearchDisabled} onClick={props.resetSearch}>See All Videos</button>

                <div className="filter-form-container">
                    <FormControl
                        placeholder="Search by ID"
                        aria-label="id"
                        name="id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        className="filter-input-id"
                    />
                    <button
                        name="id"
                        disabled={!id.length}
                        onClick={handleSearch}
                        className="filter-input-button"
                    >
                        Go!
                    </button>
                </div>

                <div className="filter-form-container">
                    <FormControl
                        placeholder="Search by URL"
                        aria-label="url"
                        name="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className="filter-input-id"
                    />
                    <button name="url"
                        disabled={!url.length}
                        onClick={handleSearch}
                        className="filter-input-button"
                    >
                            Go!
                    </button>
                </div>
                <div className="mb-3 recommendable-inputs">
                <label name="inline-radio-1" className="inline-radio-1">
                    <div className="recommendable-radio-item">
                        <Form.Check onChange={handleSearch} checked={recType === "BOTH"} name="rec" value="BOTH" label="Both" type={"radio"} id={`inline-radio-1`} />
                    </div>
                </label>
                <label name="inline-radio-2" className="inline-radio-2">
                    <div className="recommendable-radio-item">
                        <Form.Check onChange={handleSearch} checked={recType === "NON_RECOMMENDABLE"} name="rec" value="NON_RECOMMENDABLE" label="Non Recommendable" type={"radio"} id={`inline-radio-2`} />
                    </div>
                </label>
                <label name="inline-radio-3" className="inline-radio-3">
                    <div className="recommendable-radio-item">
                        <Form.Check onChange={handleSearch} checked={recType === "RECOMMENDABLE"} name="rec" value="RECOMMENDABLE" label="Recommendable" type={"radio"} id={`inline-radio-3`} />
                    </div>
                </label>
                </div>
            </div>
            <h5>Data Filters:</h5>
            <Accordion>
                <FilterSection title="Videos" k="0" selectors={props.vid_selectors} handleChng={(e)=>props.handleInputChange(e,"vid_selectors")} />
                <FilterSection title="Channels" k="1" selectors={props.channel_selectors} handleChng={(e)=>props.handleInputChange(e,"channel_selectors")} />
                <FilterSection title="Crawler Audit Data" k="2" selectors={props.crawlaud_selectors} handleChng={(e)=>props.handleInputChange(e,"crawlaud_selectors")} />
                <FilterSection title="Crawler Instructions Data" k="3" selectors={props.crawlinstr_selectors} handleChng={(e)=>props.handleInputChange(e,"crawlinstr_selectors")} />
            </Accordion>
        </Col>
    );
}

export default FiltersMenu;
