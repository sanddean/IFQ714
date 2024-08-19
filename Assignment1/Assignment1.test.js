const fs = require('fs');
const data = fs.readFileSync("Assignment1/NEOWISE_Dataset.json", "utf8");
const neowise = JSON.parse(data);

// Add all function from the AssigmentTaskj4 file
const {
    displayNEOIndex,
    displayNEOData,
    findNEO_OrbitClass,
    findNEO_Designation,
    NEOMaxOrbit,
    NEOMinOrbit,
    NEOAverageOrbit,
    MaxOrbitOfSameClassNEO,
    MinOrbitOfSameClassNEO,
    AveOrbitOfSameClassNEO,
    rearrangedNEOs,
    addTwoNo
} = require('./Assignment1.js');
const { default: test } = require('node:test');

//Testing Case for Max/Min/Ave orbit of NEO clas Apollo
it('Test Max Apollo', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Apollo');
    expect(result).toBe(9.89);
});

it('Test Min Apollo', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Apollo');
    expect(result).toBe(0.0002);
});

it('Test Ave Apollo', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Apollo');
    expect(result).toBe(1.3760450793650796);
});

//Testing Case for Max/Min/Ave orbit of NEO clas Amor
it('Test Max Amor', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Amor');
    expect(result).toBe(41.78);
});

it('Test Min Amor', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Amor');
    expect(result).toBe(0.043);
});

it('Test Ave Amor', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Amor');
    expect(result).toBe(1.8470655737704915);
});

//Testing Case for Max/Min/Ave orbit of NEO clas Aten
it('Test Max Aten', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Aten');
    expect(result).toBe(1.6);
});

it('Test Min Aten', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Aten');
    expect(result).toBe(0.007);
});

it('Test Ave Aten', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Aten');
    expect(result).toBe(0.6407999999999999);
});

//Testing Case for Max/Min/Ave orbit of NEO clas Comet
it('Test Max Comet', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Comet');
    expect(result).toBe(23255.11);
});

it('Test Min Comet', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Comet');
    expect(result).toBe(0.65);
});

it('Test Ave Comet', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Comet');
    expect(result).toBe(1719.8110370370368);
});

//Testing Case for Max/Min/Ave orbit of NEO clas Jupiter-family Comet
it('Test Max Jupiter-family Comet', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Jupiter-family Comet');
    expect(result).toBe(10.42);
});

it('Test Min Jupiter-family Comet', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Jupiter-family Comet');
    expect(result).toBe(0.204);
});

it('Test Ave Jupiter-family Comet', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Jupiter-family Comet');
    expect(result).toBe(3.0148888888888887);
});

//Testing Case for Max/Min/Ave orbit of NEO class Halley-type Comet*
it('Test Max Halley-type Comet*', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Halley-type Comet*');
    expect(result).toBe(15.64);
});

it('Test Min Halley-type Comet*', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Halley-type Comet*');
    expect(result).toBe(0.114);
});

it('Test Ave Halley-type Comet*', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Halley-type Comet*');
    expect(result).toBe(5.606999999999999);
});

//Testing Case for Max/Min/Ave orbit of NEO class Parabolic Comet
it('Test Max Parabolic Comet', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Parabolic Comet');
    expect(result).toBe(2.27);
});

it('Test Min Parabolic Comet', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Parabolic Comet');
    expect(result).toBe(0.307);
});

it('Test Ave Parabolic Comet', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Parabolic Comet');
    expect(result).toBe(1.30325);
});

//Testing Case for Max/Min/Ave orbit of NEO class Jupiter-family Comet*
it('Test Max Jupiter-family Comet*', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Jupiter-family Comet*');
    expect(result).toBe(9.72);
});

it('Test Min Jupiter-family Comet*', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Jupiter-family Comet*');
    expect(result).toBe(2.945);
});

it('Test Ave Jupiter-family Comet*', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Jupiter-family Comet*');
    expect(result).toBe(5.441666666666667);
});

//Testing Case for Max/Min/Ave orbit of NEO class Encke-type Comet
it('Test Max Encke-type Comet', () => {
    const result = MaxOrbitOfSameClassNEO(neowise,'Encke-type Comet');
    expect(result).toBe(4.6);
});

it('Test Min Encke-type Comet', () => {
    const result = MinOrbitOfSameClassNEO(neowise,'Encke-type Comet');
    expect(result).toBe(0.63);
});

it('Test Ave Encke-type Comet', () => {
    const result = AveOrbitOfSameClassNEO(neowise,'Encke-type Comet');
    expect(result).toBe(2.283333333333333);
});