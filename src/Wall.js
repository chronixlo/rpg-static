import Entity from './Entity';

class Wall extends Entity {
  constructor() {
    super('#');

    this.blocking = true;
  }
}

export default Wall;
