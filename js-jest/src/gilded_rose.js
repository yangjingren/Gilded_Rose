class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const DOUBLE_VALUE_TIME = 11;
const TRIPLE_VALUE_TIME = 6;
const DOUBLE = 2;
const TRIPLE = 3;
const EXPIRED = 0;
const CONJ_MULTIPLIER = 2;
const NORM_MULTIPLIER = 1;
const BACKSTAGE_PASS = /backstage pass/i;
const BRIE = /brie/i;
const SULFURAS = /sulfuras/i;
const CONJURED =  /conjured/i;

class Shop {

  constructor(items=[]){
    this.items = items;
  }

  increaseItemQuality(indexOfItem) {
    this.items[indexOfItem].quality += 1;
  }

  decreaseItemQuality(indexOfItem){
    this.items[indexOfItem].quality -= 1;
  }
  
  zeroizeItemQuality(indexOfItem){
    this.items[indexOfItem].quality = 0;
  }

  decreaseSellIn(indexOfItem){
    this.items[indexOfItem].sellIn -= 1;
  }

  isBackStage(indexOfItem){
    return BACKSTAGE_PASS.test(this.items[indexOfItem].name);
  }

  isBrie(indexOfItem){
    return BRIE.test(this.items[indexOfItem].name);
  }

  isSulfuras(indexOfItem){
    return SULFURAS.test(this.items[indexOfItem].name);
  }

  isConjured(indexOfItem){
    return CONJURED.test(this.items[indexOfItem].name);
  }

  isQualityWithinMaxLimit(indexOfItem){
    return this.items[indexOfItem].quality < MAX_QUALITY;
  }

  isQualityWithinMinLimit(indexOfItem){
    return this.items[indexOfItem].quality > MIN_QUALITY;
  }

  isSellInWithinLimits(indexOfItem, limit){
    return this.items[indexOfItem].sellIn < limit;
  }

  checkLimitThenIncreaseQuality(indexOfItem, multiplier){
    for (let i = 0; i < multiplier; i++){
      if (this.isQualityWithinMaxLimit(indexOfItem)){
        this.increaseItemQuality(indexOfItem)
      }
    }
  }

  checkLimitThenDecreaseQuality(indexOfItem, multiplier){
    for (let i = 0; i < multiplier; i++){
      if (this.isQualityWithinMinLimit(indexOfItem)){
        this.decreaseItemQuality(indexOfItem)
      }
    }
  }

  updateBrie(indexOfItem){
    this.decreaseSellIn(indexOfItem);
    if (!this.isSellInWithinLimits(indexOfItem, EXPIRED)){
      this.checkLimitThenIncreaseQuality(indexOfItem, NORM_MULTIPLIER)
    } else {
      this.checkLimitThenIncreaseQuality(indexOfItem, DOUBLE)
    }
  }

  updateBackStagePass(indexOfItem){
    this.decreaseSellIn(indexOfItem);
    if (this.isSellInWithinLimits(indexOfItem, EXPIRED)){
      this.zeroizeItemQuality(indexOfItem);
    } else if (this.isSellInWithinLimits(indexOfItem, TRIPLE_VALUE_TIME)){
      this.checkLimitThenIncreaseQuality(indexOfItem, TRIPLE)
    } else if (this.isSellInWithinLimits(indexOfItem, DOUBLE_VALUE_TIME)){
      this.checkLimitThenIncreaseQuality(indexOfItem, DOUBLE)
    } else {
      this.checkLimitThenIncreaseQuality(indexOfItem, NORM_MULTIPLIER)
    }
  }

  updateNormalItem(indexOfItem){
    this.decreaseSellIn(indexOfItem);
    if (!this.isSellInWithinLimits(indexOfItem, EXPIRED)){
      this.checkLimitThenDecreaseQuality(indexOfItem, NORM_MULTIPLIER)
    } else {
      this.checkLimitThenDecreaseQuality(indexOfItem, DOUBLE)
    }
  }

  updateConjuredItem(indexOfItem){
    this.decreaseSellIn(indexOfItem);
    if (!this.isSellInWithinLimits(indexOfItem, EXPIRED)){
      this.checkLimitThenDecreaseQuality(indexOfItem, NORM_MULTIPLIER * CONJ_MULTIPLIER)
    } else {
      this.checkLimitThenDecreaseQuality(indexOfItem, DOUBLE * CONJ_MULTIPLIER)
    }
  }

  updateQuality() {
    for (let indexOfItem = 0; indexOfItem < this.items.length; indexOfItem++) {
      if(this.isSulfuras(indexOfItem)){
        continue;
      }else if(this.isBrie(indexOfItem)){
        this.updateBrie(indexOfItem);
      }else if(this.isBackStage(indexOfItem)){
        this.updateBackStagePass(indexOfItem);
      }else if(this.isConjured(indexOfItem)){
        this.updateConjuredItem(indexOfItem);
      }else{
        this.updateNormalItem(indexOfItem);
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
