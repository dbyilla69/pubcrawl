import styled from 'styled-components'

export default props => {
	const { searchType, setSearchType, onChange, client } = props
	return (
		<Form>
			<fieldset>
				<SearchType>
					<span>SEARCH BY:</span>
					<label htmlFor="name-input" className={searchType === 'name' ? 'active' : ''}>
						NAME
						<input
							id="name-input"
							name="searchBy"
							type="radio"
							value="name"
							checked={searchType === 'name'}
							onChange={e => setSearchType(e.target.value)}
						/>
					</label>
					<label
						htmlFor="description-input"
						className={searchType === 'description' ? 'active' : ''}
					>
						DESCRIPTION
						<input
							id="description-input"
							name="searchBy"
							type="radio"
							value="description"
							checked={searchType === 'description'}
							onChange={e => setSearchType(e.target.value)}
						/>
					</label>
					<label htmlFor="id-input" className={searchType === 'id' ? 'active' : ''}>
						ID
						<input
							id="id-input"
							name="searchBy"
							type="radio"
							value="id"
							checked={searchType === 'id'}
							onChange={e => setSearchType(e.target.value)}
						/>
					</label>
				</SearchType>
				<label htmlFor="search">
					<TextInput
						name="search"
                        type="text"
                        placeholder="Search for a publisher"
						onChange={e => {
							e.persist()
							onChange(e, client)
						}}
					></TextInput>
					<BeerMug />
				</label>
			</fieldset>
		</Form>
	)
}

const Form = styled.form`
    max-width: 800px;
    margin: 0 auto;
	fieldset {
        padding: 10px;
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

    label[for="search"] {
        grid-row-start: 2;
    }
`

const SearchType = styled.div`
	text-align: center;
	margin: 0 10px 20px;
    grid-row-start: 1;

    span {
        font-weight: bold;
    }

	label {
		padding: 5px 0;
		margin: 0 10px;

        &:hover {
            cursor: pointer;
        }

		&.active {
			color: ${props => props.theme.blue};
			border-bottom: 1px solid ${props => props.theme.grey};
		}
	}
`

const TextInput = styled.input`
	width: calc(100% - 55px + 1rem);
	font-size: 2rem;
    line-height: 2;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0 10px;
`

const BeerMug = styled.div`
    float: right;
    margin: 1rem;
	background-image: url('//cdn.taboola.com/static/impl/png/beer-mug-transparent.png');
	height: 25px;
	width: 25px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`
