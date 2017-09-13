
// define an animation
dp.def({

    key : 'pl_d', // player death

    ini : function () {

        var i = 0,
        s = this;
        while (i < 4) {

            this.bx.push({

                // standard box values
                x : 0,
                y : 0,
                a : 0,
                w : 16,
                h : 16,
                hw : 8,
                hh : 8,
                s : '#ffffff',
                f : '#00ffff',
                i : 3,

                Y : Math.floor(i / 2),
                X : i % 2,
                he : _.r(_.tau)

            });

            i++;
        }

    },

    // for frame method
    ff : function () {

        var s = this,
        x,
        y;

        s.bx.forEach(function (bx, i) {

            bx.a = bx.he;
            bx.x = s.unit.x + bx.X * bx.w + Math.cos(bx.he) * (50 * s.p);
            bx.y = s.unit.y + bx.Y * bx.h + Math.sin(bx.he) * (50 * s.p);
            bx.f = 'rgba(0,255,128,' + (1 - s.p) + ')';
            bx.s = 'rgba(255,255,255,' + (1 - s.p) + ')';

        });

    }
});

dp.start({

    key : 'pl_d',
    unit : {

        x : 0,
        y : 0,
        w : 32,
        h : 32

    }
});

var loop = function () {

    if (dp.stack.length > 0) {

        setTimeout(loop, 100);

		_.l(dp.stack[0]);
		
        dp.tick();
    }

    

};

loop();
