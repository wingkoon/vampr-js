class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfPeople = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestor = {};
    let vampire1 = this;
    let vampire2 = vampire;
    const compare = function(vampire1, vampire2, flag) {
      // flag = -1, means only compare the vampire2 with the left vampire1 and its ancestors;
      // flag = 1, means only compare the vampire1 with the right vampire2 and its ancestors;
      if (vampire1 === vampire2) {
        if (flag === -1) {
          return vampire1;
        } else return vampire2;
      }
      if (flag === -1) {
        if (vampire1.creator) {
          vampire1 = vampire1.creator;
          ancestor = compare(vampire1, vampire2, flag);
          if (ancestor) {
            return ancestor;
          }
        } else return false;
      }
      if (flag === 1) {
        if (vampire2.creator) {
          vampire2 = vampire2.creator;
          ancestor = compare(vampire1, vampire2, flag);
          if (ancestor) {
            return ancestor;
          }
        } else return false;
      }
    };
   
    if (vampire1 === vampire2) {
      return vampire;
    } else if (this.creator) {
      ancestor = compare(this, vampire, -1);
      if (ancestor) {
        return ancestor;
      }
    } if (vampire.creator) {
      ancestor = compare(this, vampire, 1);
      if (ancestor) {
        return ancestor;
      }
    }
    if (this.creator && vampire.creator) {
      vampire1 = this.creator;
      vampire2 = vampire.creator;
      ancestor = vampire1.closestCommonAncestor(vampire2);
      if (ancestor) {
        return ancestor;
      }
    }
    return "";
  }
}

module.exports = Vampire;

