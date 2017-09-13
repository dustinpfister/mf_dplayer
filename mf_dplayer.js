/*
mf_dplayer.js
a deterministic animation player

 */

var dp = (function () {

    // current load of animations
    var load = {},

    // animation instance constructor
    ANI = function (obj) {

        // must know the animation
        this.key = obj.key;

        this.f = 0; // start at frame 0
        this.mf = 75; // max frame of 50 for now

        this.p = 0;
        this.b = 0;

        this.dr = []; // drawings
        this.bx = []; // boxes

        this.unit = obj.unit || {}; // a unit associated with the animation
        this.onk = obj.onk || function () {};

        // set initial state
        load[this.key].ini.call(this);

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

                // call set for the new frame
                ani.set();

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
