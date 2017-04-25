import React, { Component } from 'react';
import Util from './Util';
import Wall from './Wall';
import Ground from './Ground';
import Player from './Player';

class World extends Component {
  constructor(props) {
    super(props);

    let size = this.size = {
      x: 20,
      y: 40
    };

    let world = this.world = [];

    for (let y = 0; y < size.y; y++) {
      world[y] = [];
      for (let x = 0; x < size.x; x++) {
        // disgusting
        world[y][x] = !x || x === size.x - 1 || !y || y === size.y - 1 ?
         new Wall() :
         Math.random() > 0.1 ? new Ground() : new Wall();
      }
    }

    let player = new Player();

    // limit movement speed(?)
    const binds = {
      w: () => {player.y--},
      s: () => {player.y++},
      a: () => {player.x--},
      d: () => {player.x++}
    };

    const moveValid = {
      w: () => !this.isBlocking(player.y - 1, player.x),
      s: () => !this.isBlocking(player.y + 1, player.x),
      a: () => !this.isBlocking(player.y, player.x - 1),
      d: () => !this.isBlocking(player.y, player.x + 1)
    };

    let pressedKeys = {
      w: false,
      s: false,
      a: false,
      d: false
    };

    let currentPresses = [];

    let moveInterval;
    let moving = false;

    let startMove = () => {
      if (moving) {
        return;
      }

      moving = true;
      move();

      moveInterval = setInterval(() => {
        move();
      }, 100);
    };

    let stopMove = () => {
      moving = false;
      clearInterval(moveInterval);
    };

    let move = () => {
      if (!currentPresses.length) {
        return;
      }

      let key = currentPresses[currentPresses.length - 1];
      moveValid[key]() && binds[key]();
      this.setState({activeEntities: this.state.activeEntities.slice()});
    };

    // todo keybinder class
    document.addEventListener('keydown', e => {
      if (!binds[e.key] || pressedKeys[e.key]) {
        return;
      }

      pressedKeys[e.key] = true;

      currentPresses.push(e.key);

      startMove();
    });

    document.addEventListener('keyup', e => {
      if (!binds[e.key]) {
        return;
      }

      pressedKeys[e.key] = false;

      currentPresses.splice(currentPresses.indexOf(e.key), 1);

      if (!currentPresses.length) {
        stopMove();
      }
    });

    this.state = {
      activeEntities: [
        player
      ]
    };
  }

  isBlocking(y, x) {
    return this.world[y][x].blocking;
  }

  render() {
    // todo fog(?)

    return (
      <div className="world">
        {
          this.world.map((row, y) => {
            return <div className="row" key={y}>
              {
                row.map((entity, x) => {
                  return <span className="entity" key={x}>
                    {
                      this.state.activeEntities.map((activeEntity, idx) => {
                        return <span key={idx}>
                          {
                            Util.objEquals(activeEntity.coords(), {x, y}) ? activeEntity.character : entity.character
                          }
                        </span>
                      })
                    }
                  </span>
                })
              }
            </div>
          })
        }
      </div>
    );
  }
}

export default World;
