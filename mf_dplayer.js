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
                /*
                ani.p = ani.f / ani.mf;
                ani.b = 1 - Math.abs(.5 - ani.p) / .5;

                load[ani.key].ff.call(ani);
                 */
                ani.set();
                ani.f++;

            });

            // bring out your dead
            i = this.stack.length;
            while (i--) {

                ani = this.stack[i];

                if (ani.f >= ani.mf) {

                    // call on kill method
                    ani.onk();

                    this.stack.splice(i, 1);

                }

            }

        },

        start : function (obj) {

            var ani;

            if (obj.key in load) {

                ani = new ANI(obj);

                // set initial state
                load[obj.key].ini.call(ani);

                this.stack.push(ani);

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
