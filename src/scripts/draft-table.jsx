import React from 'react';
import firebase from './firebase';

class DraftTableHead extends React.Component {
    render() {
        return (
            <thead className="elegant-color white-text">
            <tr>
                <th>Pick</th>
                <th>Shareholder</th>
                <th>Game</th>
                <th>Opponent</th>
                <th>Date</th>
            </tr>
            </thead>
        );
    }
}

class DraftTableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    render() {
        const draftRows = this.props.data.map((draft, i) =>
            <tr key={'draft_'+i}>
                <td>{draft.pick}</td>
                <td>{draft.shareholder}</td>
                <td>{draft.gameId}</td>
                <td>{draft.opponent}</td>
                <td>{draft.date}</td>
            </tr>
        );
        return <tbody>{draftRows}</tbody>;
    }
}

class DraftTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {picks: []};
    }

    authListener() {
        var _this = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                _this.loadPicks();
            } 
            else {
                _this.clearPicks();
            }
        });
    }

    loadPicks() {
        var _this = this;

        var db = firebase.database();
        let picksRef = db.ref('picks');
        picksRef.off();
        let gamesRef = db.ref('games');
        gamesRef.off();
  
        var sortPicks = function(a, b) {
            if (a.pick < b.pick) {
                return -1;
            }
            if (a.pick > b.pick) {
                return 1;
            }
            return 0;
        }

        var showPicks = function(data) {
            var pickData = data.val();
            picksRef.child(pickData.pick).once("value", function(picksValue) {
                gamesRef.child(pickData.gameId).once("value", function(gameValue) {
                    var gameData = gameValue.val();
                    var pick = {
                        "pick": pickData.pick,
                        "shareholder": pickData.shareholder,
                        "gameId": pickData.gameId,
                        "opponent": gameData.opponent,
                        "date": gameData.date
                    };
                    _this.setState({ picks: _this.state.picks.concat([pick]).sort(sortPicks) });

                });
            });
        };
        picksRef.on('child_added', showPicks);
        picksRef.on('child_changed', showPicks);
        picksRef.on('child_removed', _this.clearPicks);
    }

    clearPicks() {
        this.setState({picks: []});
    }

    componentWillMount() {
        this.authListener = this.authListener.bind(this);
        this.authListener();
        this.loadPicks();
    }

    render() {
        var _this = this;

        var result;
        if (_this.state.picks && _this.state.picks.length > 0) {
            result = (
                <table className="table table-sm table-responsive table-striped">
                    <DraftTableHead/>
                    <DraftTableBody data={_this.state.picks}/>
                </table>
            );  
        }
        else {
            result = (
                <div></div>
            );
        }
        return result;
    }
}

export default DraftTable;
