import React, {Component} from "react";
import Artists from "./Artists";
import Albums from "./Albums";

class App extends Component {
  state = {
    openAlbums: false,
    rockArtist: ""
  }

  handleOpenAlbums = (rockArtist) => {
    this.setState({openAlbums: true, rockArtist: rockArtist})
  }

  render() {
    return (
      <div className="container">
        {this.state.openAlbums ? <Albums rockArtist={this.state.rockArtist} /> : <Artists openAlbums={this.handleOpenAlbums} />}
      </div>
    );
  }
}

export default App;