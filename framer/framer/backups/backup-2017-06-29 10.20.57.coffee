# Create PageComponent
mainScroller = new PageComponent
	point: Align.center
	width: Screen.width
	height: Screen.height
	scrollVertical: false
	clip: false
	backgroundColor: "transparent"
	directionLock: true

page2Container = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "transparent"

page4Container = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "transparent"

mainScroller.addPage(page1,)
mainScroller.addPage(page2Container, "right")
mainScroller.addPage(page3, "right")
mainScroller.addPage(page4Container, "right")

page2Scroller = new PageComponent
	point: Align.center
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
	clip: false
	backgroundColor: "transparent"
	parent: page2Container
	directionLock: true

page2Scroller.addPage(page2,)
page2Scroller.addPage(page21, "down")
page2Scroller.addPage(page22, "down")

page3Container = new Layer
	backgroundColor: "transparent"

page4Scroller = new PageComponent
	point: Align.center
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
	clip: false
	backgroundColor: "transparent"
	parent: page4Container
	directionLock: true

page4Scroller.addPage(page4)
page4Scroller.addPage(page41, "down")
page4Scroller.addPage(page42, "down")