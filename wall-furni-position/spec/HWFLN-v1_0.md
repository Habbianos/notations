# **Habbo Wall Furni Location Notation (HWFLN) v1.0**

- **Specification Status:** Exploratory
- **Date:** 2025-04-29
- **Available in:** English

<details><summary>Table of Contents</summary>
<div class="js-toc"></div>
</details>

## Wall Furni Location

```txt
leftwall <y>,<h>,<locZ>
frontwall <y>,<h>,<locZ>
```

### Shockwave Code

```ls
on getScreenLoc me
  the itemDelimiter = ","
  if word 1 of pLocation = "leftwall" then
    x = 0
    y = item 1 of word 2 of pLocation
    h = item 2 of word 2 of pLocation
  else
    if word 1 of pLocation = "frontwall" then
      x = 0
      y = item 1 of word 2 of pLocation
      h = item 2 of word 2 of pLocation
    end if
  end if
  screenLocs = getScreenCoordinate(x, y, h)
  sprite(me.spriteNum).locH = screenLocs[1]
  sprite(me.spriteNum).locV = screenLocs[2]
  sprite(me.spriteNum).locZ = value(item 3 of word 2 of pLocation)
  if sprite(me.spriteNum).locZ > 30000 then
    sprite(me.spriteNum).locZ = screenLocs[3] - 1000
  end if
end
```

```ls
on createPoster me
  if leftOrRight contains "left" then
    s = "PLACEITEMFROMSTRIP" && pID && "leftwall " & y & "," & h & "," & myLocZ & "/" & pType
  else
    s = "PLACEITEMFROMSTRIP" && pID && "frontwall " & y & "," & h & "," & myLocZ & "/" & pType
  end if
  sendFuseMsg(s)
  s = "GETSTRIP" && "new"
  sendFuseMsg(s)
end
```

```ls
on createPostIt me
  global gpPostItNos
  if leftOrRight contains "left" then
    s = "ADDITEM /post.it/leftwall " & y & "," & h & "," & myLocZ & "/" & myColor && field("post.it field_Add")
  else
    s = "ADDITEM /post.it/frontwall " & y & "," & h & "," & myLocZ & "/" & myColor && field("post.it field_Add")
  end if
  sendFuseMsg(s)
  noOfPostits = getaProp(gpPostItNos, stripItemId)
  if noOfPostits = VOID then
    noOfPostits = 20
  end if
  s = "SETSTRIPITEMDATA " & RETURN & stripItemId & RETURN & noOfPostits - 1
  sendFuseMsg(s)
  setaProp(gpPostItNos, stripItemId, noOfPostits - 1)
  if (noOfPostits - 1) <= 0 then
    s = "REMOVESTRIPITEM " & stripItemId
    sendFuseMsg(s)
    sendFuseMsg("GETSTRIP new")
  end if
end
```

### Flash Code

```as
if(_loc2_.indexOf(":") == 0)
{
    _loc6_ = new §_-51O§(_loc11_,_loc7_,false);
    if((_loc22_ = _loc2_.split(" ")).length >= 3)
    {
        _loc17_ = String(_loc22_[0]);
        _loc23_ = String(_loc22_[1]);
        _loc24_ = String(_loc22_[2]);
        if(_loc17_.length > 3 && _loc23_.length > 2)
        {
            _loc17_ = _loc17_.substr(3);
            _loc23_ = _loc23_.substr(2);
            if((_loc22_ = _loc17_.split(",")).length >= 2)
            {
                _loc13_ = _loc22_[0];
                _loc14_ = _loc22_[1];
                if((_loc22_ = _loc23_.split(",")).length >= 2)
                {
                    _loc21_ = _loc22_[0];
                    _loc15_ = _loc22_[1];
                    _loc6_.wallX = _loc13_;
                    _loc6_.wallY = _loc14_;
                    _loc6_.localX = _loc21_;
                    _loc6_.localY = _loc15_;
                    _loc6_.dir = _loc24_;
                    _loc6_.data = _loc5_;
                    _loc6_.state = _loc20_;
                }
            }
        }
    }
}
else
{
    _loc6_ = new §_-51O§(_loc11_,_loc7_,true);
    if((_loc22_ = _loc2_.split(" ")).length >= 2)
    {
        if((_loc24_ = String(_loc22_[0])) == "rightwall" || _loc24_ == "frontwall")
        {
            _loc24_ = "r";
        }
        else
        {
            _loc24_ = "l";
        }
        if((_loc10_ = (_loc19_ = String(_loc22_[1])).split(",")).length >= 3)
        {
            _loc16_ = 0;
            _loc18_ = parseFloat(_loc10_[0]);
            _loc8_ = parseFloat(_loc10_[1]);
            _loc6_.y = _loc18_;
            _loc6_.z = _loc8_;
            _loc6_.dir = _loc24_;
            _loc6_.data = _loc5_;
            _loc6_.state = _loc20_;
        }
    }
}
```