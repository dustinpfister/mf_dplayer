
// define an animation
dp.def({

    key : 'pl_d', // player death

    ini : function () {

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
            f : '#ff0000',
            i : 3,

            he : 0

        });

    },

    // for frame method
    ff : function () {

        var s = this,
        x,
        y;

        s.bx.forEach(function (bx, i) {

            bx.he = _.tau * s.p
                bx.x = s.unit.x + Math.cos(bx.he) * 100 * s.b;
            bx.y = s.unit.y + Math.sin(bx.he) * 100 * s.b;

        });

    }
});

var unit = {

    x : 160 - 16,
    y : 120 - 16,
    w : 32,
    h : 32

};

dp.start({

    key : 'pl_d',
    mf : 40,
    loop : true,
    unit : unit

});
// game loop
var loop = function () {

    var s = dp.stack.length;

    requestAnimationFrame(loop);

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

};

loop();
