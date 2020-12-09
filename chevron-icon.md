```html
<div class="chevron">
  <div class="chevron__arrow chevron__left"></div>
  <div class="chevron__arrow chevron__right"></div>
</div>
```

```scss
.chevron {
  position: relative;

  width: 9px;
  height: 9px;

  // border: 1px solid;

  .chevron__arrow {
    position: absolute;
    top: 30%;

    width: 80%;
    height: 25%;

    background-color: #000;
    border: 1px transparent;
    border-radius: 15px;
  }

  .chevron__left {
    left: -8%;

    transform: rotateZ(45deg);
  }

  .chevron__right {
    right: -8%;

    transform: rotateZ(135deg);
  }
}

```