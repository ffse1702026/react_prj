
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


package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Genaration {

	
	public static Character[] array = new Character[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
			'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
			'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W',
			'Z'
	
	};
	
	public static Character[] arrayNumber = new Character[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
	
	};
	
	
	ArrayList<String> lists = new ArrayList<>();
	
	public static void main(String[] args) {
		String test = "001";
		System.out.println(generate(test));
		test = "009";
		System.out.println(generate(test));
		test = "9A9";
		System.out.println(generate(test));
	}
	
	public static String generate(String test) {
		
		try {
			int number = Integer.parseInt(test);
			if(number < 999) {
				return generateNotNumber(test, arrayNumber);
			}
			return generateNotNumber(test, array);
			
		} catch (NumberFormatException e) {
//			return generateNotNumber(test);
			return generateNotNumber(test, array);
		}
		
		
	}
	
	public static String generateNotNumber( String test, Character[] characters) {
		char[] charArr = test.toCharArray();
		List<Character> list = (List<Character>) Arrays.asList(characters);
		Character firstCharater = list.indexOf(charArr[2]) == characters.length - 1 && list.indexOf(charArr[1]) == characters.length - 1 
				? characters[list.indexOf(charArr[0])] : charArr[0];
		Character secondCharacter = list.indexOf(charArr[2]) == characters.length - 1 ? 
				list.indexOf(charArr[1]) == characters.length - 1 ? characters[0] :
					characters[list.indexOf(charArr[1]) + 1] : 
						charArr[1];	
		System.out.println(list.indexOf(charArr[2]));
		Character thirdCharacter = list.indexOf(charArr[2]) == characters.length - 1 ? characters[0] : characters[list.indexOf(charArr[2]) + 1];
		return firstCharater.toString() + secondCharacter.toString() + thirdCharacter.toString();
	}

}

