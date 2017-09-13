# md_dplayer
### a deterministic animation player


## getting started

To get started define an animation

```js
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
```

Then use dp.start to start an instance of that animation

```js

dp.start({
    key : 'pl_d',
    mf : Math.floor(_.r(100)*10),
    unit : {
        x : 160 - 16,
        y : 120 - 16,
        w : 32,
        h : 32,
    }
});
```

Then just use dp.tick to tick the current animation stack forward