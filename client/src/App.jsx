import React, { Component } from 'react';
import './App.css';
require('isomorphic-fetch');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		fetch('/api/fetchPostsData')
			.then(res => res.json({}))
			.then(data => {
				console.log(data)
				this.setState({
					data
				})
			});
	}

	renderTable = (tableData, subIdx) => {
		return (
			<table>	
				<thead>	
					<tr>	
						{
							tableData && Object.keys(tableData[0]).map((dataItemKey, idx) => {
								return (
									<th key={'head_' + idx + (subIdx || '')}>
										{dataItemKey}
									</th>	
								)
							})
						}	
						</tr>	
				</thead>	
				<tbody>
					{
						tableData && tableData.map((dataItem, idx) => {
							return (
								<tr style={{borderWidth:2, borderColor: 'grey', borderStyle: 'solid', backgroundColor:idx%2 == 0 ? 'lightgrey' : 'white'}} key={'row_' + dataItem.id + (subIdx || '')}>
									{
										Object.keys(dataItem).map((dataItemKey, idx) => {
											return (
												<td key={'row_' + dataItem.id + '_col_' + idx + (subIdx || '')}>
													{
														typeof dataItem[dataItemKey] == 'string'
															? dataItem[dataItemKey]
															: this.renderTable([dataItem[dataItemKey]], dataItem.id + '_' + dataItemKey)
													}
												</td>	
											)
										})
									}
								</tr>	
							)
						})
					}	
				</tbody>
			</table>	
		)
	}

	render() {
		const { data } = this.state
		return (
			<div className="App">
				<h1>Data</h1>	
					{data && data.data && this.renderTable(data.data)}
			</div>
		);
	}
}

export default App;