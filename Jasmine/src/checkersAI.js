/*
 * Created by michael on 2016-02-14.
 */

const RED = 11;
const BLACK = 7;
var gameField = [];
function setGameField(gameField) {
    for (var x = 0; x < 8; ++x) {
        gameField[x]=[];
        for (var y = 0; y < 8; ++y) {
            if (((y%2 == 0) && (x%2 == 1) && (y <3)) || ((y%2 == 1) && (x%2 == 0) && (y <3))) {
                //red
                gameField[x][y] = 11;
            }
            else if (((y%2 == 0) && (x%2 == 1) && (y>4)) || ((y%2 == 1) && (x%2 == 0) && (y>4))) {
                //black
                gameField[x][y] = 7;
            }
            else if (((y%2 == 0) && (x%2 == 1))|| ((y%2 == 1) && (x%2 == 0)))
            //empty
                gameField[x][y] = 5;
            else
            //cant touch
                gameField[x][y] = 3;
        }
    }
}

function ()

function actionScores(gameField,xPos,yPos,color){
    var index;
    var tree = [];
    var tempVal = gameField[xPos][yPos];
    if ((tempVal%RED == 0)||(tempVal == 2*BLACK)) {
        tree.push(moveScore(gameField, xPos, yPos, xPos + 1, yPos + 1));
        tree.push(moveScore(gameField, xPos, yPos, xPos - 1, yPos + 1));
        tree.push(attackScore(gameField, xPos, yPos, xPos + 2, yPos + 2, color));
        tree.push(attackScore(gameField, xPos, yPos, xPos - 2, yPos + 2, color));
    }
    if ((tempVal%BLACK == 0)||(tempVal == 2*RED)) {
        tree.push(moveScore(gameField, xPos, yPos, xPos + 1, yPos - 1));
        tree.push(moveScore(gameField, xPos, yPos, xPos - 1, yPos - 1));
        tree.push(attackScore(gameField, xPos, yPos, xPos + 2, yPos - 2, color));
        tree.push(attackScore(gameField, xPos, yPos, xPos - 2, yPos - 2, color));
    }
    index = maxVal(tree);
    if (color == BLACK)
        index = index+4;
    switch(index) {
        case 0:
            movePieces(xPos,yPos,xPos+1,yPos+1);
            break;
        case 1:
            movePieces(xPos,yPos,xPos-1,yPos+1);
            break;
        case 2:
            movePieces(xPos,yPos,xPos+2,yPos+2);
            break;
        case 3:
            movePieces(xPos,yPos,xPos-2,yPos+2);
            break;
        case 4:
            movePieces(xPos,yPos,xPos+1,yPos-1);
            break;
        case 5:
            movePieces(xPos,yPos,xPos+1,yPos-1);
            break;
        case 6:
            movePieces(xPos,yPos,xPos+2,yPos-2);
            break;
        case 7:
            movePieces(xPos,yPos,xPos-2,yPos-1);
            break;
    }
}
function maxVal(numArray) {
    return Math.max.apply(null, numArray);
}
function attackScore(gameField,oldX,oldY,newX,newY,color){
    var tempGF = gameField;
    var targetY = (newY - oldY)/2;
    var targetX = (newX - oldX)/2;
    if ((newX > 0) && (newX <8) && (newY > 0) && (newY < 8)) {
        var newVal = tempGF[newX][newY];
        var targetVal = tempGF[targetX][targetY];
        if ((newVal == 5) && (targetVal % color != 0)) {
            tempGF[newX][newY] = tempGF[oldX][oldY];
            tempGF[oldX][oldY] = 5;
            tempGF[targetX][targetY] = 5;
            return score(tempGF);
        }
    }
    else
        return null;
}
function moveScore(gameField,oldX,oldY,newX,newY){
    //color: -1 goes up +1 goes down
    var tempGF = gameField;
    if(move(tempGF,oldX,oldY,newX,newY))
        return score(tempGF);
    else
        return null;
}

function move(tempGF,oldX,oldY,newX,newY){
    var newVal = tempGF[newX][newY];
    var oldVal = tempGF[oldX][oldY];
    if(newVal == 5) {
        tempGF[newX][newY] = oldVal;
        tempGF[oldX][oldY] = 5;
        return true;
    }
    return false;
}
function score(gameField) {
    var score = 0;
    for (var x = 0; x < 8; ++x) {
        for (var y = 0; y < 8; ++y) {
            if (gameField[x][y]%7==0)
                score++;
            else if (gameField[x][y]%11==0)
                score--;
        }
    }
    return score;
}
