package deserialization101;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.util.Comparator;
import java.util.stream.Collectors;

public class CustomComparator implements Serializable, Comparator<Integer> {
    static final long serialVersionUID = 1L;

    private String operator;

    public CustomComparator(String operator) {
        this.operator = operator;
    }

    @Override
    public int compare(Integer i1, Integer i2) {
        String op = i1 + this.operator + i2;

        try {
            ProcessBuilder processBuilder = new ProcessBuilder(new String[] {"/usr/bin/python3", "-c", "print(" + op + ")"});
            Process process = processBuilder.start();

            String result =
                new BufferedReader(new InputStreamReader(process.getInputStream()))
                    .lines()
                    .collect(Collectors.joining("\n"));

            return Integer.parseInt(result);
            
        } catch(Exception e) {
            throw new RuntimeException("Failed to handle " + op + ", because: " + e.getMessage());
        }
    }
}
