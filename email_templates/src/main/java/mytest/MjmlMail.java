package mytest;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import com.github.jknack.handlebars.io.TemplateLoader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class MjmlMail {

  public static void main(String args[]) {
    runDummyTest();

//    handlebarCompile("welcome-mail");
  }

  public static void handlebarCompile(String mjmlTemplateName) {
    TemplateLoader loader = new ClassPathTemplateLoader();
    loader.setSuffix(".mjml");
    Handlebars handlebars = new Handlebars(loader);
    try {
      Template template = handlebars.compile(mjmlTemplateName);

      MyDummy myDummy = new MyDummy("blue");
      String mjmlData = template.apply(myDummy);

      System.out.println(mjmlData);

      outputTemplate(mjmlData);

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void outputTemplate(String template) {
    Path path = Paths.get("mjml-output/mjml/test-final-output.html");
//    Path path = Paths.get("mjml-output/mjml/test.mjml");
    try {
      BufferedWriter writer = Files.newBufferedWriter(path);
      writer.write(template);
      writer.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void runDummyTest() {
    TemplateLoader loader = new ClassPathTemplateLoader();
//    loader.setSuffix(".mjml");
    Handlebars handlebars = new Handlebars(loader);
    try {
      Template template = handlebars.compile("welcome-mail");
//      Template template = handlebars.compile("test");

      MyDummy myDummy = new MyDummy("blue");
      String mjmlData = template.apply(myDummy);

      System.out.println(mjmlData);

      outputTemplate(mjmlData);

    } catch (IOException e) {
      e.printStackTrace();
    }
  }


}
