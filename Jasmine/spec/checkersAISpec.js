/**
 * Created by micha on 2016-02-14.
 */
describe("checks the score", function() {
    var gameField = [];

    beforeEach(function () {
        setGameField(gameField);
    });

    it("score should be zero", function () {
        expect(gameScore(gameField)).toEqual(0);

    });
});