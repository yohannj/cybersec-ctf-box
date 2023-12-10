package deserialization101;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;

public class Game1 {

    public static String game1(String userInput) throws Exception {
        var userValue = (Integer) unserializeUserInput(userInput);
        CustomComparator customComparator = new CustomComparator("-");

        var l = new ArrayList<Integer>();
        l.add(42);
        l.add(123);
        l.add(1337);
        l.add(1);
        l.add(userValue);
        Collections.sort(l, customComparator);
        var userInputIdx = l.indexOf(userValue);

        return Integer.toString(userInputIdx);
    }

    public static Object unserializeUserInput(String userInput) throws Exception {
        byte[] bytes = Base64.getDecoder().decode(userInput);
        var bais = new ByteArrayInputStream(bytes);
        var ois = new ObjectInputStream(bais);
        return ois.readObject();
    }
}
