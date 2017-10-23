
defaultParallaxOriginZ = 200

setupParallax = (component) ->
	for segment in component.content.children
		segment._initPoint = segment.point

		unless segment._hasListeners?
			# Add listeners to recalculate parallax when size or position was modified
			segment.onChange "size", -> @_initPoint = @point
			segment.onChange "z", -> applyParallax(component)

			for axis in ["x", "y"]
				do (axis) ->
					segment.onChange axis, ->
						@_initPoint[axis] = @point[axis] unless @_parallaxUpdate

			segment._hasListeners = true

		for descendant in segment.descendants

			# Try to guess the right parallaxOrigin{x,y} for ParallaxScrollComponent
			for axis in ["x", "y"]
				component._parallaxOrigin[axis] = segment[axis] if component._parallaxOrigin[axis] is null

			descendant._segment = segment
			descendant._initPoint = descendant.point

			unless descendant._hasListeners?
				# Add listeners to recalculate parallax when size or position was modified
				descendant.onChange "size", ->
					@_initPoint = @point
					for axis in ["x", "y"]
						updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin)

				descendant.onChange "z", -> applyParallax(component)
				for axis in ["x", "y"]
					do (axis) ->
						descendant.onChange axis, ->
							@_initPoint[axis] = @point[axis] unless @_parallaxUpdate
							updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin)

				descendant._hasListeners = true

		# Ugly workaround: Wait until next tik, so all children/descendants are guaranteed to be ready
		Utils.delay 0, -> applyParallax(component)


# Apply / update parallax of single layer
updateLayerParallax = (layer, axis, offset, origin) ->
	layer._parallaxUpdate = true
	try layer[axis] = (offset + layer._segment._initPoint[axis] - origin[axis]) / origin.z * layer.z + layer._initPoint[axis]
	layer._parallaxUpdate = false


# Apply / update parallax of all layers
applyParallax = (component, axes = ["x", "y"], offset = 0) ->
	for axis in axes
		for segment in component.content.children
			if segment.children.length is 0
				segment._parallaxUpdate = true
				try segment[axis] = offset / component._parallaxOrigin.z * segment.z + segment._initPoint[axis]
				segment._parallaxUpdate = false
			else
				for descendant in segment.descendants
					updateLayerParallax(descendant, axis, offset, component._parallaxOrigin)


class exports.ParallaxScrollComponent extends ScrollComponent

	@define "parallaxOrigin",
		default: {x: null, y: null, z: defaultParallaxOriginZ},
		get: -> @_parallaxOrigin
		set: (val) ->
			@_parallaxOrigin = {}
			for key of val
				@_parallaxOrigin[key] = val[key]

			@_parallaxOrigin.x ?= null
			@_parallaxOrigin.y ?= null
			@_parallaxOrigin.z ?= defaultParallaxOriginZ


	constructor: ->
		super

		@content.onChange "children", => setupParallax(this)

		for axis in ["x", "y", "z"]
			do (axis) => @content.onChange axis, => applyParallax(this, axis, @content[axis])


class exports.ParallaxPageComponent extends PageComponent

	@define "parallaxOrigin",
		default: {x: null, y: null, z: defaultParallaxOriginZ},
		get: -> @_parallaxOrigin
		set: (val) ->
			@_parallaxOrigin = {}
			for key of val
				@_parallaxOrigin[key] = val[key]

			@_parallaxOrigin.x ?= null
			@_parallaxOrigin.y ?= null
			@_parallaxOrigin.z ?= defaultParallaxOriginZ


	constructor: ->
		super

		@content.onChange "children", => setupParallax(this)

		for axis in ["x", "y", "z"]
			do (axis) => @content.onChange axis, => applyParallax(this, axis, @content[axis])


#TODO: add ParallaxFlowComponent 


