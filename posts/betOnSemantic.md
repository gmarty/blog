{
  title: "Always bet on semantic",
  date: "2013-10-18",
  description: "Using semantic tells about your intentions and makes UI more robust."
}

## Don't get tricked by the visual
My company is working on a mobile website. One of the developers in my team needed to implement a numeric field to input a number of people.

He did this:
```html
<input name="people" type="tel">
```

He tested on iPhone and concluded it was OK.

And he wasn't completely wrong. Indeed when tapping the field, a nice numeric keyboard is displayed.

## Semantic informs about your intention
Of course, something is wrong in the example above. Even if the visual aspect is correct, the semantic is not. A better way is to use:
```html
<input name="people" type="number">
```

Or better using the [recommended hack for iPhone](https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/KeyboardManagement/KeyboardManagement.html#//apple_ref/doc/uid/TP40009542-CH5-SW12):
```html
<input name="people" type="number" pattern="[0-9]*">
```

This implementation is correct: visually we have a numeric keyboard and we maintain the semantic aspect.

What if in the future phone numbers are replaced by ID? Or if they must be picked up from the contact book? The interface would change and the original snippet in this example wouldn't work anymore.

A rule of thumb is you always win by betting on semantic. Semantic informs the browser about your intention. Browsers change but intentions remain.
