{
  title: "Helpful trigonometric and geometric snippets for JavaScript",
  date:  "2012-09-18",
  description: "A set of useful functions to do trigonometry in JavaScript."
}

I recently worked on a project with a heavy need of trigonometric functions.
Basically I had to implement a drawing feature using a graphic lib.

I found a few resources really useful, specially in JavaScript.
But first of all, you should read this [post by Chris Heilmann](http://coding.smashingmagazine.com/2011/10/04/quick-look-math-animations-javascript/), a crash course in JavaScript trigonometry.

I thought the following snippets would be useful.

## The length of a segment

Using Pythagoras' theorem, computing the hypotenuse given the 2 other sides is as easy as doing this:

```javascript
/**
 * Compute the size of the 3rd side of a triangle opposed to a right angle.
 * Named after ES6 Math.hypot(), with only 2 arguments.
 * @param {number} segment1 The length of the 1st side.
 * @param {number} segment2 The length of the 2nd side.
 * @return {number} The size of the 3rd side.
 */
function hypot(segment1, segment2) {
  return Math.sqrt(segment1 * segment1 + segment2 * segment2);
}

// Alternatively, this function is polyfilled as follow and is said to be faster albeit less precise:
function hypot(segment1, segment2) {
  segment1 = Math.abs(segment1);
  segment2 = Math.abs(segment2);

  var min = Math.min(segment1, segment2);
  var max = Math.max(segment1, segment2);

  if (min === 0)
    return max;
  else {
    var u = min / max;
    return max * Math.sqrt(1 + u * u);
  }
}
```

This function is a polyfill for the upcoming Math.hypot() function of ES6. You don't need to bother passing positive values only. It works with negative lengths also (the power of 2 always return a positive number).

## The distance between 2 points

Using the `hypot()` function defined above:

```javascript
/**
 * Return the distance between 2 points.
 * @param {number} x1 The x coordinate of line 1.
 * @param {number} y1 The y coordinate of line 1.
 * @param {number} x2 The x coordinate of line 2.
 * @param {number} y2 The y coordinate of line 2.
 * @return {number} The distance between (x1, y1) and (x2, y2).
 */
function pointsDistance(x1, y1, x2, y2) {
  return hypot(x1 - x2, y1 - y2);
}
```

## The angle of a triangle given 3 sides length

```javascript
/**
 * Return the angle of a triangle given its sides length.
 * @param {number} side1 The length of the 1st side.
 * @param {number} side2 The length of the 2nd side.
 * @param {number} side3 The length of the 3nd side.
 * @return {number} The angle opposed to 3rd side.
 */
function segmentsAngle(side1, side2, side3) {
  return Math.acos((side1 * side1 + side2 * side2) - side3) / (2 * side1 * side2)):
}
```

## The distance of a point to a line

```javascript
/**
 * Return the distance of a point to a line.
 * @param {number} xP The x coordinate of the point.
 * @param {number} yP The y coordinate of the point.
 * @param {number} x1 The x coordinate of line 1.
 * @param {number} y1 The y coordinate of line 1.
 * @param {number} x2 The x coordinate of line 2.
 * @param {number} y2 The y coordinate of line 2.
 * @return {number} The distance of point (xP, yP) to the line (x1, y1)-(x2, y2).
 */
function pointToLine(xP, yP, x1, y1, x2, y2) {
  var normalLength = pointsDistance(x1, y1, x2, y2);
  return Math.abs((xP - x1) * (y2 - y1) - (yP - y1) * (x2 - x1)) / normalLength;
}
```

## Get a line equation given coordinates

For the sake of simplicity on the next snippets, we ignore the case where computation would lead to a division by 0. But make sure you properly check on your scripts.

```javascript
/**
 * Return a and b of a line equation of the form y = ax + b, given segment coordinates.
 * @param {number} x1 The x coordinate of line 1.
 * @param {number} y1 The y coordinate of line 1.
 * @param {number} x2 The x coordinate of line 2.
 * @param {number} y2 The y coordinate of line 2.
 * @return {Object.<string, number>} An object with a and b properties.
 */
function lineEquation(x1, y1, x2, y2) {
  var a = (y1 - y2) / (x1 - x2);
  return {a: a, b: y1 - a * y2};
};
```

## The intersection point of 2 lines

```javascript
/**
 * Return the (x, y) coordinates of the intersection point of 2 lines.
 * @param {number} a1 The a of line 1 equation.
 * @param {number} b1 The b of line 1 equation.
 * @param {number} a2 The a of line 2 equation.
 * @param {number} b2 The b of line 2 equation.
 * @return {Object.<string, number>} An object with x and y properties.
 */
function linesIntersectionPoint(a1, b1, a2, b2) {
  var x = (b2 - b1) / (a1 - a2);
  return {x: x, y: (a1 * x) + b1};
};
```

These functions are pretty basic but are a solid ground base for more complex computations.
Also I will probably add more snippets here as time/need permits.
