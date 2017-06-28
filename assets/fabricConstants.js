angular.module('common.fabric.constants', [])

.service('FabricConstants', [function () {

	var objectDefaults = {
		rotatingPointOffset: 20,
		padding: 0,
		borderColor: '#e0edf7',
		cornerColor: 'rgba(64, 159, 221, 1)',
		cornerSize: 5,
		transparentCorners: false,
		hasRotatingPoint: true,
		centerTransform: true
	};

	return {

		presetSizes: [
			{
				name: 'iPad Landscape',
				height: 768,
				width: 1024
			},
			{
				name: 'iPad Portrait',
				height: 1024,
				width: 766
			},
			{
				name: 'iPad Pro Landscape',
				height: 1024,
				width: 1366
			},
			{
				name: 'iPad Pro Portrait',
				height: 1366,
				width: 1024
			}
		],

		fonts: [
			{
				name: 'Arial'
			},
			{
				name: 'Lora'
			},
			{
				name: 'Croissant One'
			},
			{
				name: 'Architects Daughter'
			},
			{
				name: 'Emblema One'
			},
			{
				name: 'Graduate'
			},
			{
				name: 'Hammersmith One'
			},
			{
				name: 'Oswald'
			},
			{
				name: 'Oxygen'
			},
			{
				name: 'Krona One'
			},
			{
				name: 'Indie Flower'
			},
			{
				name: 'Courgette'
			},
			{
				name: 'Gruppo'
			},
			{
				name: 'Ranchers'
			},
			{
				name: 'Roboto'
			},
			{
				name: 'Impact'
			}
		],

		shapeCategories: [
			{
				name: 'Popular Shapes',
				shapes: [
					'arrow6',
					'bubble4',
					'circle1',
					'rectangle1',
					'star1',
					'triangle1'
				]
			},
			{
				name: 'Simple Shapes',
				shapes: [
					'circle1',
					'heart1',
					'rectangle1',
					'triangle1',
					'star1',
					'star2',
					'star3',
					'square1'
				]
			},
			{
				name: 'Arrows & Pointers',
				shapes: [
					'arrow1',
					'arrow9',
					'arrow3',
					'arrow6',
				]
			},
			{
				name: 'Bubbles & Balloons',
				shapes: [
					'bubble5',
					'bubble4'
				]
			},
			{
				name: 'Check Marks',
				shapes: [

				]
			},
			{
				name: 'Badges',
				shapes: [
					'badge1',
					'badge2',
					'badge4',
					'badge5',
					'badge6'
				]
			}
		],

		JSONExportProperties: [
			'height',
			'width',
			'background',
			'objects',

			'originalHeight',
			'originalWidth',
			'originalScaleX',
			'originalScaleY',
			'originalLeft',
			'originalTop',

			'lineHeight',
			'lockMovementX',
			'lockMovementY',
			'lockScalingX',
			'lockScalingY',
			'lockUniScaling',
			'lockRotation',
			'lockObject',
			'id',
			'isTinted',
			'filters'
		],
		
		activeGroup: angular.extend({
			selection: true,
					rotatingPointOffset: 20,
		padding: 0,
		borderColor: '#EEF6FC',
		cornerColor: 'rgba(64, 159, 221, 1)',
		cornerSize: 5,
		transparentCorners: false,
		hasRotatingPoint: true,
		centerTransform: true
		}, objectDefaults),

		canvasDefaults: angular.extend({
			selection: true
		}, objectDefaults),
		
		rectDefaults: angular.extend({
			left: 100,
			top: 100,
			fill: '#0088cc',
			width: 200,
			height: 200,
			rx: 20,
			ry: 20
		}, objectDefaults),

		shapeDefaults: angular.extend({
			fill: '#0088cc'
		}, objectDefaults),

		textDefaults: angular.extend({
			originX: 'left',
			scaleX: 1,
			scaleY: 1,
			fontFamily: 'Impact',
			fontSize: 40,
			fill: '#454545',
			textAlign: 'left'
		}, objectDefaults)

	};

}]);