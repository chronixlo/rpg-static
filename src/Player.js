import React from 'react';
import Entity from './Entity';

class Player extends Entity {
  constructor() {
    super(<span className="player">@</span>);

    this.x = 1;
    this.y = 1;
  }

  coords() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

export default Player;
