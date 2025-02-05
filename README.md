Fourier series drawing. Check it out!! [laurgao.github.io/fourier](https://laurgao.github.io/fourier)

![](screenshot.png)

---

One day, I was bored. So I decided to learn about the Fourier transform.

I used Adobe Illustrator to trace a continuous outline of the original photo, converted it to svg, used Python to sample the x and y coordinates of ~400 evenly-spaced points along the svg path, and then plugged those points into a discrete fourier transform with the y coordinate as the imaginary part. Main Fourier logic is in `sketch.js`. This project was done over one weekend.

Stuff that helped me:

-   [Coding Challenge #130.1: Drawing with Fourier Transform and Epicycles](https://www.youtube.com/watch?v=MY4luNgGfms) by The Coding Train
-   [But what is a Fourier series? From heat flow to drawing with circles | DE4](https://www.youtube.com/watch?v=r6sGWTCMz2k&t=646s) by 3Blue1Brown. The animation in this video of the portrait of Fourier is what I was trying to recreate.
-   [Epicycles, complex Fourier series and Homer Simpson's orbit](https://www.youtube.com/watch?v=qS4H6PEcCCA&t=601s) by Mathologer
-   [This video](https://www.youtube.com/watch?v=iSw2xFhMRN0) by blackpenredpen which is where I worked out the integrals for the formula deriving fourier series coefficients and they actually made sense. God, integrals are beautiful. God, math is so much more beautiful when you work out the equations yourself.
-   [This notebook](https://observablehq.com/@mbostock/fourier-series-path-sampling) for talking about sampling points from a SVG path.

Potential future improvements:

-   Don't use linear sampling
-   Speed controls
-   Controls for # sample points
