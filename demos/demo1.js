
// define an animation
dp.def({

    key : 'pl_d', // player death

    ini : function () {

        var i = 0;
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
            bx.x = s.unit.x + bx.X * bx.w + Math.cos(bx.he) * (100 * s.p);
            bx.y = s.unit.y + bx.Y * bx.h + Math.sin(bx.he) * (100 * s.p);
            bx.f = 'rgba(0,255,128,' + (1 - s.p) + ')';
            bx.s = 'rgba(255,255,255,' + (1 - s.p) + ')';

        });

    }
});

dp.start({

    key : 'pl_d',
    mf : 40,
    loop : true,
    unit : {

        x : 160 - 16,
        y : 120 - 16,
        w : 32,
        h : 32

    }

});
// game loop
var loop = function () {

    var s = dp.stack.length;

    requestAnimationFrame(loop);

    //    if (s > 0) {

    C.cls();

    var i = s;
    while (i--) {

        dp.stack[i].bx.forEach(function (bx) {

            C.dBX(bx);

        });

    }

    C.ctx.fillStyle = '#00ff00';
    C.ctx.fillText(s, 20, 20);

    dp.tick();

    //  } else {}

};

loop();
