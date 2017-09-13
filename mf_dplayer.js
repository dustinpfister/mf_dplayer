/*
mf_dplayer.js
a deterministic animation player

0.1.x

 * add a kill when method


 */

var dp = (function () {

    // current load of animations
    var load = {},

    // animation instance constructor
    ANI = function (obj) {

        var s = this;

        // must know the animation
        s.key = obj.key;

        s.f = 0; // start at frame 0
        s.mf = obj.mf || 75; // max frame of 50 for now

        s.p = 0;
        s.b = 0;

        s.dr = []; // drawings
        s.bx = []; // boxes

        s.unit = obj.unit || {}; // a unit associated with the animation
        s.onk = obj.onk || function () {}; // on kill

        s.loop = obj.loop || false;
        s.kWhen = obj.kWhen || function () {
            return false;
        };

        // set initial state
        load[s.key].ini.call(s);

        // set
        this.set();

    };

    // set the animation according to it's current frame
    ANI.prototype.set = function () {

        var s = this;

        s.p = s.f / s.mf;
        s.b = 1 - Math.abs(.5 - s.p) / .5;

        load[s.key].ff.call(s);

    };

    // kill if the given condition is true
    ANI.prototype.killWhen = function (con) {};

    // public api
    return {

        // current stack of animations
        stack : [],

        // what to do on each tick
        tick : function () {

            var ani,
            i;

            // update animations
            this.stack.forEach(function (ani) {

                // step frame forward
                ani.f++;

                if (ani.loop && ani.f >= ani.mf) {

				_.l('yeah')
				
                    ani.f = 0;

                }

                // call set for the new frame
                ani.set();

                if (ani.kWhen()) {

                    ani.f = ani.mf;
                    ani.loop = false;

                }

            });

            // bring out your dead
            i = this.stack.length;
            while (i--) {

                ani = this.stack[i];

                // if the current frame is greaer than or equal to the max frame value
                // then the animation is over
                if (ani.f >= ani.mf) {

                    // call on kill method
                    ani.onk();

                    // purge dead animation from the stack
                    this.stack.splice(i, 1);

                }

            }

        },

        // start a new animation and add it to the stack
        start : function (obj) {

            if (obj.key in load) {

                // this can be a one liner for now
                this.stack.push(new ANI(obj));

            }

        },

        // define an animation
        def : function (aniObj) {

            // just ref it in for now
            load[aniObj.key] = aniObj;

        }

    };

}
    ());
