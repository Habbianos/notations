# Firework Particles

from furnidata:

```json
{
 "id": 4835,
 "classname": "fireworks_15",
 "revision": 48943,
 "category": "other",
 "defaultdir": 0,
 "xdim": 1,
 "ydim": 1,
 "name": "Fireworks Wolf Blue",
 "description": "Light it up!",
 "adurl": null,
 "offerid": -1,
 "buyout": false,
 "rentofferid": -1,
 "rentbuyout": false,
 "bc": false,
 "excludeddynamic": false,
 "customparams": "fireworks_charge_15,10,20,10",
 "specialtype": 1,
 "canstandon": false,
 "cansiton": false,
 "canlayon": false,
 "furniline": "xmas2012",
 "environment": null,
 "rare": false
}
```

```txt
fireworks_charge_15,10,20,10
```

from furni's swf logic:

```xml
<?xml version="1.0" encoding="ISO-8859-1" ?>
<objectData type="fireworks_15">
  <model>
    <dimensions x="1" y="1" z="1"/>
    <directions>
      <direction id="0"/>
    </directions>
  </model>
  <particlesystems>
    <particlesystem size="64" canvas_id="3" offset_y="130" blend="1">
      <emitter id="2" sprite_id="1" explosion_animation="" fuse_time="7" name="rocket" max_num_particles="600" particles_per_frame="20" burst_pulse="1">
        <simulation force="300" direction="-1.0" energy="120" shape="plane" gravity="20" airfriction="0.13"/>
        <particles>
          <particle is_emitter="false" lifetime="100" fade="true">
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="140" fade="true">
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="60" fade="true">
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="50" fade="true">
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_4"/>
            <frame name="fireworks_15_64_c_0_5"/>
            <frame name="fireworks_15_64_c_0_6"/>
            <frame name="fireworks_15_64_c_0_7"/>
            <frame name="fireworks_15_64_c_0_4"/>
            <frame name="fireworks_15_64_c_0_5"/>
            <frame name="fireworks_15_64_c_0_6"/>
            <frame name="fireworks_15_64_c_0_7"/>
            <frame name="fireworks_15_64_c_0_4"/>
            <frame name="fireworks_15_64_c_0_5"/>
            <frame name="fireworks_15_64_c_0_6"/>
            <frame name="fireworks_15_64_c_0_7"/>
            <frame name="fireworks_15_64_c_0_4"/>
            <frame name="fireworks_15_64_c_0_5"/>
            <frame name="fireworks_15_64_c_0_6"/>
            <frame name="fireworks_15_64_c_0_7"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="55" fade="true">
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_1"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_3"/>
            <frame name="fireworks_15_64_c_0_2"/>
            <frame name="fireworks_15_64_c_0_8"/>
            <frame name="fireworks_15_64_c_0_9"/>
            <frame name="fireworks_15_64_c_0_10"/>
            <frame name="fireworks_15_64_c_0_11"/>
            <frame name="fireworks_15_64_c_0_8"/>
            <frame name="fireworks_15_64_c_0_9"/>
            <frame name="fireworks_15_64_c_0_10"/>
            <frame name="fireworks_15_64_c_0_11"/>
            <frame name="fireworks_15_64_c_0_12"/>
            <frame name="fireworks_15_64_c_0_13"/>
            <frame name="fireworks_15_64_c_0_14"/>
            <frame name="fireworks_15_64_c_0_15"/>
          </particle>
        </particles>
      </emitter>
    </particlesystem>
    <particlesystem size="32" canvas_id="3" offset_y="130" blend="1">
      <emitter id="2" sprite_id="1" explosion_animation="" fuse_time="7" name="rocket" max_num_particles="600" particles_per_frame="20" burst_pulse="1">
        <simulation force="280" direction="-1.0" energy="120" shape="cone" gravity="20" airfriction="0.13"/>
        <particles>
          <particle is_emitter="false" lifetime="80" fade="true">
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="140" fade="true">
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="60" fade="true">
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="50" fade="true">
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_4"/>
            <frame name="fireworks_15_32_c_0_5"/>
            <frame name="fireworks_15_32_c_0_6"/>
            <frame name="fireworks_15_32_c_0_7"/>
            <frame name="fireworks_15_32_c_0_4"/>
            <frame name="fireworks_15_32_c_0_5"/>
            <frame name="fireworks_15_32_c_0_6"/>
            <frame name="fireworks_15_32_c_0_7"/>
            <frame name="fireworks_15_32_c_0_4"/>
            <frame name="fireworks_15_32_c_0_5"/>
            <frame name="fireworks_15_32_c_0_6"/>
            <frame name="fireworks_15_32_c_0_7"/>
            <frame name="fireworks_15_32_c_0_4"/>
            <frame name="fireworks_15_32_c_0_5"/>
            <frame name="fireworks_15_32_c_0_6"/>
            <frame name="fireworks_15_32_c_0_7"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
          </particle>
          <particle is_emitter="false" lifetime="55" fade="true">
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_1"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_3"/>
            <frame name="fireworks_15_32_c_0_2"/>
            <frame name="fireworks_15_32_c_0_8"/>
            <frame name="fireworks_15_32_c_0_9"/>
            <frame name="fireworks_15_32_c_0_10"/>
            <frame name="fireworks_15_32_c_0_11"/>
            <frame name="fireworks_15_32_c_0_8"/>
            <frame name="fireworks_15_32_c_0_9"/>
            <frame name="fireworks_15_32_c_0_10"/>
            <frame name="fireworks_15_32_c_0_11"/>
            <frame name="fireworks_15_32_c_0_12"/>
            <frame name="fireworks_15_32_c_0_13"/>
            <frame name="fireworks_15_32_c_0_14"/>
            <frame name="fireworks_15_32_c_0_15"/>
          </particle>
        </particles>
      </emitter>
    </particlesystem>
  </particlesystems>
</objectData>
```
