
<!DOCTYPE html>
<html>
<head>
<style>

html, body{
    height: 100%;
    margin: 0;
    overflow: hidden;
}

.outside {
	width: 100%;
    height: 100%;
    display: flex;
    position: relative;
}

.inside {
	width: 100%;
    height: 100%;
    overflow: scroll;
}

.inside-element {
	background-color: rgba(255, 255, 255, 0.85);
    width: 4800px;
    height: 3200px;
    cursor: default;
	position: relative;
}

svg {
	position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
	width: 100%;
    height: 100%;
}

</style>
</head>
<body>

<div class="outside">
	<div class="inside">
		<div class="inside-element">
			
			
			<svg></svg>
			

		</div>
	</div>
</div>
</body>
</html>
