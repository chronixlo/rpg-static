export default {
  objEquals: (obj, other) => {
    for (let key in obj) {
      if (obj[key] !== other[key]) {
        return false;
      }
    }

    return true;
  }
};