var templates = {

		templates: {		
			blah: {				
					index : [{"t":7,"e":"header","f":"<ul><li>one</li> <li>two</li> <li>three</li> <li>four</li> <li>five</li></ul>"}]
			},
			box : [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
			button : [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
			image : [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}],
			one: {				
					box : [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
					button : [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
					image : [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}],
				two: {					
						box : [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
						button : [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
						image : [{"t":7,"e":"img","a":{"src":[{"t":2,"x":{"r":["img","src"],"s":"${0}-${1}"}}],"class":"image"}}]
				}
			}
		}

};