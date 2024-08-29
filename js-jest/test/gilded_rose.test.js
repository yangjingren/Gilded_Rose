const { Item, Shop } = require("../src/gilded_rose.js");

describe('Function Testing', () => {
  it("should increase the quality of the item", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    gildedRose.increaseItemQuality(0);
    expect(gildedRose.items[0].quality).toBe(21);
  })

  it("should decrease the quality of the item", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);
    
    gildedRose.decreaseItemQuality(0);
    
    expect(gildedRose.items[0].quality).toBe(19);
  })

  it("should zeroize the quality of the item", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);
    
    gildedRose.zeroizeItemQuality(0);
    
    expect(gildedRose.items[0].quality).toBe(0);
  })

  it("should return if quality is within maximum limits", () => {
    let normalItem = new Item("normal", 10, 20);
    let highQualityItem = new Item("normal", 10, 50);

    const gildedRose = new Shop([normalItem, highQualityItem]);
    
    expect(gildedRose.isQualityWithinMaxLimit(0)).toBe(true);
    expect(gildedRose.isQualityWithinMaxLimit(1)).toBe(false);
  })

  it("should return if quality is within minimum limits", () => {
    let normalItem = new Item("normal", 10, 20);
    let lowQualityItem = new Item("normal", 10, 0);

    const gildedRose = new Shop([normalItem, lowQualityItem]);
    
    expect(gildedRose.isQualityWithinMinLimit(0)).toBe(true);
    expect(gildedRose.isQualityWithinMinLimit(1)).toBe(false);
  })

  it("should increase the quality only up to the limit", () => {
    let highQualityItem = new Item("normal", 10, 49);

    const gildedRose = new Shop([highQualityItem]);
    
    gildedRose.checkLimitThenIncreaseQuality(0, 2)

    expect(gildedRose.items[0].quality).toBe(50);
  })

  it("should decrease the quality only down to the limit", () => {
    let lowQualityItem = new Item("normal", 10, 1);

    const gildedRose = new Shop([lowQualityItem]);
    
    gildedRose.checkLimitThenDecreaseQuality(0, 2)

    expect(gildedRose.items[0].quality).toBe(0);
  })

  it("should return if sellIn is within bounds", () => {
    let normalItem = new Item("normal", 14, 20);
    let midSellinItem = new Item("normal", 10, 0);
    let lowerSellinItem = new Item("normal", 5, 50);
    let belowSellinItem = new Item("normal", -1, 50);

    const gildedRose = new Shop([normalItem, midSellinItem, lowerSellinItem, belowSellinItem]);
    
    expect(gildedRose.isSellInWithinLimits(0, 11)).toBe(false);
    expect(gildedRose.isSellInWithinLimits(1, 11)).toBe(true);
    expect(gildedRose.isSellInWithinLimits(2, 6)).toBe(true);
    expect(gildedRose.isSellInWithinLimits(3, 0)).toBe(true);
  })
  
  it("should decrease sellIn time by 1", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);
    
    gildedRose.decreaseSellIn(0);
    
    expect(gildedRose.items[0].sellIn).toBe(9);
  })

  it("should return if it is Aged Brie", () => {
    let normalItem = new Item("normal", 10, 20);
    let brie = new Item("Aged Brie", 10, 20);
    
    const gildedRose = new Shop([normalItem, brie]);
    
    expect(gildedRose.isBrie(0)).toBe(false);
    expect(gildedRose.isBrie(1)).toBe(true);
  })

  it("should return if it is a Backstage pass", () => {
    let normalItem = new Item("normal", 10, 20);
    let backStage = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    
    const gildedRose = new Shop([normalItem, backStage]);
    
    expect(gildedRose.isBackStage(0)).toBe(false);
    expect(gildedRose.isBackStage(1)).toBe(true);
  })
  
  it("should return if it is Sulfuras", () => {
    let normalItem = new Item("normal", 10, 20);
    let legendaryItem = new Item("Sulfuras, Hand of Ragnaros", 10, 20);

    const gildedRose = new Shop([normalItem, legendaryItem]);
    
    expect(gildedRose.isSulfuras(0)).toBe(false);
    expect(gildedRose.isSulfuras(1)).toBe(true);
  })

  it("should return if it is Conjured", () => {
    let conjuredItem = new Item("Conjured", 10, 20);
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([conjuredItem, normalItem]);
    
    expect(gildedRose.isConjured(0)).toBe(true);
    expect(gildedRose.isConjured(1)).toBe(false);
  })


  it("should increase brie quality by 1 if sellIn is not EXPIRED", () => {
    let brieItem = new Item("Aged Brie", 1, 20);

    const gildedRose = new Shop([brieItem]);
    gildedRose.updateBrie(0);
    
    expect(gildedRose.items[0].quality).toBe(21);
  })

  it("should increase brie quality by 2 if sellIn is EXPIRED", () => {
    let brieItem = new Item("Aged Brie", 0, 20);

    const gildedRose = new Shop([brieItem]);
    gildedRose.updateBrie(0)

    expect(gildedRose.items[0].quality).toBe(22);
  })

  it("should increase the price of the backstage pass by 1 if sellIn is at NORM_MULTIPLIER", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 14, 20);

    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateBackStagePass(0);
    
    expect(gildedRose.items[0].quality).toBe(21);
  })

  it("should increase the price of the backstage pass by 2 if sellIn is in DOUBLE_VALUE_TIME", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);

    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateBackStagePass(0);
    
    expect(gildedRose.items[0].quality).toBe(22);
  })

  it("should increase the price of the backstage pass by 3 if sellIn is in TRIPLE_VALUE_TIME", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);

    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateBackStagePass(0);
    
    expect(gildedRose.items[0].quality).toBe(23);
  })

  it("should zeroize the price of the backstage pass if sellIn is EXPIRED", () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);

    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateBackStagePass(0);
    
    expect(gildedRose.items[0].quality).toBe(0);
  })

  it("should decrease the quality of a normal item by 1 if sellIn is not EXPIRED", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);
    
    gildedRose.updateNormalItem(0);
    
    expect(gildedRose.items[0].quality).toBe(19);
  })

  it("should decrease the quality of a normal item by 2 if sellIn is EXPIRED", () => {
    let normalItem = new Item("normal", 0, 20);
    const gildedRose = new Shop([normalItem]);
    
    gildedRose.updateNormalItem(0);
    
    expect(gildedRose.items[0].quality).toBe(18);
  })

  it("should decrease the quality of a conjured item by 2 if sellIn is not EXPIRED", () => {
    let conjuredItem = new Item("Conjured", 10, 20);
    const gildedRose = new Shop([conjuredItem]);
    
    gildedRose.updateConjuredItem(0);
    
    expect(gildedRose.items[0].quality).toBe(18);
  })

  it("should decrease the quality of a normal item by 4 if sellIn is EXPIRED", () => {
    let conjuredItem = new Item("Conjured", 0, 20);
    const gildedRose = new Shop([conjuredItem]);
    
    gildedRose.updateConjuredItem(0);
    
    expect(gildedRose.items[0].quality).toBe(16);
  })

})




describe("Gilded Rose Pin Down Tests", () => {
  test("Should create an empty array of items", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(19);
  });

  test("Normal items should degrade in quality by 2 each day if sellin is 0", () => {
    let normalItem = new Item("normal", 0, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18);
  });

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });

  test('Quality of "Aged Brie" should increase by 2 each day if it is extra old', () => {
    let agedBrie = new Item("Aged Brie", 0, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(23);
  });

  test('Quality of "Backstage passes" should be 0 if the concert is over', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(0);
  });

  test("Sulfuras items should not change", () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
    const gildedRose = new Shop([sulfuras]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
  });

  test("Conjured items should degrade in quality by 2 each day", () => {
    let normalItem = new Item("Conjured", 10, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(18);
  });

  test("Conjured items should degrade in quality by 4 each day if sellIn is 0", () => {
    let normalItem = new Item("Conjured", 0, 20);
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(16);
  });

});
