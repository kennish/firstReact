let propTypes = {
    searchData: PT.func,
    changeText: PT.func,
    keySearchData: PT.func,
    searchText: PT.string
}

export default function SearchBar(props){

    let {searchData, changeText, keySearchData, searchText} = props;
    return (
        <div className="searchBar">
            <div className="input-group">
                <input type="text" className="form-control" value={searchText} onChange={changeText} onKeyDown={keySearchData} placeholder="请输入电影名称" />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={searchData}>搜索</button>
                </span>
            </div>
        </div>
    )

}

SearchBar.propTypes = propTypes;