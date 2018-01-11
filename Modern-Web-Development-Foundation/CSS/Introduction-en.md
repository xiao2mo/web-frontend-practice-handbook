[🔆 中文版本](./概念介绍与语法基础.md) | [☀️ English Version](./Introduction-en.md)

# Cascading Style Sheets

CSS ( Cascading Style Sheets ) is a language that allows you to describe the styles your markup should have.

# Selectors

We can use different selectors in CSS, to group different elements and apply the same style rules to this group. These selectors also can be grouped into three categories: Element selectors, Class and ID selectors and Attribute selectors.

## Basic Selectors

### Element Selectors

The h1 and p tags are grouped and share the same rules. Instead of creating three different rules to style the paragraphs and two rules for my headers, I only make one for each.

```css
/* Individual Elements */

p {
  color: green;
  font-size: 18px;
}

h1 {
  border: 2px solid red;
  color: brown;
}

/* Grouping Elements */
span,
a,
p {
  background-color: aqua;
}
```

### Class & ID Selectors

To allow more flexibility while selecting your elements, you can specify one or more classes to an element. Each class is space-separated. We use the class attribute.

```html
<p class="danger"></p>
<h1 class="danger title"></h1>
```

In CSS, you use a period ( . ) to indicate that you are targetting a specific class name. You can chain several classes one after another.

```css
.danger {
  /* Will style the paragraph */
}

.danger.title {
  /* Will style the h1*/
}
```

ID are very similar to classes, but can only be used for one element and an element can only have one ID. ID are targetted by a pound sign ( # ) in a CSS declaration, and have more weight than classes.

```css
#special-paragraph {
  color: orange;
}

/* The class only changes the font-size */
#title {
  background-color: lightblue;
}
```

### Attribute selectors

Class and ID are attributes, but perform special roles and handled in a special way.

* Simple attribute selector, target all p element who have a key attribute:

```css
p[key] {
  color: red;
}

/* OR, all elements with a key attribute, not just p */
[key] {
  color: red;
}
```

* Exact attribute values

```css
/* If the href is https://google.com, it won't match */
a[href="google.com"] {
  color: purple;
}

/* The following are NOT equal */
[class="danger warning"] {
  color: red;
}

.danger.warning {
  color: orange;
}
```

* Partial attribute values

```css
[attribute~="val"] {
  /* Attribute contains val in a space-separated list of words */
  /* Would match "friend" in "my friend Joe" */
}

[attribute*="val"] {
  /* Select any element with an attribute whose value CONTAINS val */
}

[attribute^="val"] {
  /* Select any element with an attribute whose value BEGINS with val */
}

[attribute$="val"] {
  /* Select any element with an attribute whose value ENDS with val*/
}

[attribute|="val"] {
  /*
  Select any element with an attribute whose value starts with val followed by a dash (val-)
  OR whose value is exactly equal to val.
  */
}

[attribute="val"i] {
  /* Add a i after the value to make it case insensitive ( The value will be case insensitive, NOT the attribute name. */
}
```

## Cascading Selector

## Weight
