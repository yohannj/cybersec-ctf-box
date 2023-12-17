# Javansomware

## Vulnerability
Encryption algorithm is fully reversible.

## Exploitation
We have in our hand a jar file.  
To access its content we can use a decompiler. For example this [online version](https://www.decompiler.com/).

The decompiled jar contains a single java file: Ransom.java.
```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class Ransom {
   private static final String ALGORITHM_NAME = "RC4";
   private static final SecretKey SECRET_KEY = new SecretKeySpec("Long passphrase are always secure :)".getBytes(), "RC4");

   public static void main(String[] var0) throws Exception {
      Cipher var1 = Cipher.getInstance("RC4");
      Stream var2 = Files.walk(Paths.get("."));

      try {
         List var3 = (List)var2.filter((var0x) -> {
            return Files.isRegularFile(var0x, new LinkOption[0]) && var0x.toString().endsWith(".important");
         }).collect(Collectors.toList());
         Iterator var4 = var3.iterator();

         while(var4.hasNext()) {
            Path var5 = (Path)var4.next();
            byte[] var6 = Files.readAllBytes(var5);
            byte[] var7 = encrypt(var6, var1);
            Files.write((new File(var5.toString() + ".hax")).toPath(), var7, new OpenOption[0]);
         }
      } catch (Throwable var9) {
         if (var2 != null) {
            try {
               var2.close();
            } catch (Throwable var8) {
               var9.addSuppressed(var8);
            }
         }

         throw var9;
      }

      if (var2 != null) {
         var2.close();
      }

   }

   private static byte[] encrypt(byte[] var0, Cipher var1) throws Exception {
      var1.init(1, SECRET_KEY);
      byte[] var2 = var1.doFinal(var0);
      byte[] var3 = new byte[var2.length];

      for(int var4 = 0; var4 < var2.length; ++var4) {
         var3[var4] = var2[var2.length - var4 - 1];
      }

      return var3;
   }
}
```

In this code, we detect the usage of RC4 encryption and the passphrase `Long passphrase are always secure :)`
```java
private static final SecretKey SECRET_KEY = new SecretKeySpec("Long passphrase are always secure :)".getBytes(), "RC4");

Cipher var1 = Cipher.getInstance("RC4");
var1.init(1, SECRET_KEY);
byte[] var2 = var1.doFinal(decodedFileInByteArray);
```

However, it's not just doing RC4, after that, it also reverses all the bytes.
```java
for(int var4 = 0; var4 < var2.length; ++var4) {
    var3[var4] = var2[var2.length - var4 - 1];
}
```

Reversing bytes is quite straightforward.  
As for RC4, it relies on XOR, and similar decryption techniques work.  
In particular `RC4(RC4(decoded file, key), key) == decoded file`, so in our case: `RC4(encoded file, "Long passphrase are always secure :)") == decoded file`.

We can use online tools like [CyberChef](https://gchq.github.io/CyberChef) to load the encoded file, reverse and use RC4 with the passphrase.

If we want to stay in Java, we can write a decryption method:
```java
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
            var files = stream.filter((file) -> Files.isRegularFile(file) && file.toString().endsWith(".hax"))
                .collect(Collectors.toList());

            for(Path p : files) {
                var data = Files.readAllBytes(p);
                var decrypted = decrypt(data, cipher);

                Files.write(new File(p.toString() + ".decoded").toPath(), decrypted);
            }
        }
    }

    private static byte[] decrypt(byte[] securelyEncrypted, Cipher cipher) throws Exception {
        var encrypted = new byte[securelyEncrypted.length];
        for(var i = 0; i < securelyEncrypted.length; ++i) {
            encrypted[i] = securelyEncrypted[securelyEncrypted.length - i - 1];
        }

        cipher.init(Cipher.DECRYPT_MODE, SECRET_KEY);
        var decrypted = cipher.doFinal(encrypted);

        return decrypted;
    }
}
```

## Fix
N/A
