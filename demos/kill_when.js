/*

kill when demo

 */

// define an animation
dp.def({

    key : 'pl_d', // player death

    ini : function () {

        this.bx.push({

            // standard box values
            x : 0,
            y : 0,
            a : 0,
            w : 8,
            h : 8,
            hw : 4,
            hh : 4,
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

            bx.he = _.tau * s.p;
            bx.x = s.unit.x + s.unit.hw - bx.hw + Math.cos(bx.he) * bx.w;
            bx.y = s.unit.y + s.unit.hh - bx.hh + Math.sin(bx.he) * bx.h;
            //bx.x = s.unit.x + Math.cos(bx.he) * s.unit.w * s.b + bx.hw;
            //bx.y = s.unit.y + Math.sin(bx.he) * s.unit.h * s.b + bx.hh;

        });

    }
});

var unit = {

    x : 20,
    y : 120 - 16,
    w : 32,
    h : 32,
    hw : 16,
    hh : 16

};

dp.start({

    key : 'pl_d',
    mf : 40,
    loop : true,
    unit : unit,
    onk : function () {

        _.l('killed');

    },

    kWhen : function () {

        _.lo(this);

        if (this.unit.x >= 250) {

            return true;

        }

        return false;

    }

});
// game loop
var loop = function () {

    var s = dp.stack.length;

    requestAnimationFrame(loop);

    C.cls();

    // draw unit area
    C.ctx.fillStyle = '#808080';
    C.ctx.fillRect(unit.x, unit.y, unit.w, unit.h);

    var i = s;
    while (i--) {

        dp.stack[i].bx.forEach(function (bx) {

            C.dBX(bx);

        });

    }

    C.ctx.fillStyle = '#00ff00';
    C.ctx.fillText(unit.x, 20, 20);

    dp.tick();

    if (unit.x < 250) {

        unit.x += 1;

    }

};

loop();
