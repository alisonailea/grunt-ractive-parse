Ext.define('MyApp.test.tmp.ExtTemplates', {
	blah: {
		index.html: [{"t":7,"e":"header","f":"<ul><li>one</li> <li>two</li> <li>three</li> <li>four</li> <li>five</li></ul>"}],
		index.html: [{"t":7,"e":"header","f":"<ul><li>one</li> <li>two</li> <li>three</li> <li>four</li> <li>five</li></ul>"}]
	},
	templ: {
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}],
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}]
	},
	one: {
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}],
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}]
	},
	two: {
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}],
		box.html: [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
		button.html: [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
		image.html: [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}]
	}
});