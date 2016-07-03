# [clock.js](http://rack.pub/clock.min.js)
### Synopsis

Simple datetime tools.  2.39KB minified.  One file.  

### Code Example
```
clock.now	-->	1462248501241
clock.time	-->	11:08 PM
clock.since(1462245888784)	-->	44 minutes
```
> :clapper: The properties are live (via getters), i.e., clock.now returns a current timestamp each time you call it.

### Motivation

My need for a lightweight, easy to use, simple, and intuitive datetime tools library in a single JavaScript file.

### Installation

:checkered_flag: Load via rack.pub's global CDN

`<script src="https://rack.pub/clock.min.js"></script>`

:rocket:  Embed clock.min.js in your javascript when putting in production for best page loading performance.

### API Reference

```
clock.now	-->	1462248501241
clock.time	-->	11:08 PM
clock.weekday	-->	monday
clock.day	-->	2
clock.month	-->	may
clock.year	-->	2016
clock.since(1462245888784)	-->	44 minutes
clock.until(1462255888784)	-->	2 hours
clock.what.time(1462245888784)	-->	10:24 PM
clock.what.weekday(1461968554458)	-->	friday
clock.what.day('14622458887 84')	-->	2
clock.what.month(1461968554458)	-->	april
clock.what.year('1461968554458')	-->	2016
clock.what.time()	-->	11:11 PM
clock.what.weekday('14619685abcd')	-->	clock.js error : expected unix timestamp as argument
clock.unit.seconds	-->	1000
clock.unit.minutes	-->	60000
clock.unit.hours	-->	3600000
clock.unit.days	-->	86400000
clock.unit.weeks	-->	604800000
clock.unit.months	-->	2628002880
clock.unit.years	-->	31536000000
```
> :point_right: although negligible in most cases, months and years are approximated for the `clock.since(timestamp)` and `clock.until(timestamp)` methods and the `clock.unit.months` and `clock.unit.years` properties.

### Contribute

If you found a bug, have any questions or want to contribute please let me know, [ron@rack.pub](mailto:ron@rack.pub).

### License

Ron Royston, [https://rack.pub](https://rack.pub), [MIT License](https://en.wikipedia.org/wiki/MIT_License)