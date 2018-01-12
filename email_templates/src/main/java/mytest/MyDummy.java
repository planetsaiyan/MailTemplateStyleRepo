package mytest;

public class MyDummy {
  private String name;
  private String myOrange = "orange";
  private String myteststring = "this is from hanleywood...";

  public MyDummy(String name) {
    this.name = name;
  }

  public String getMyOrange() {
    return myOrange;
  }

  public void setMyOrange(String myOrange) {
    this.myOrange = myOrange;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMyteststring() {
    return myteststring;
  }

  public void setMyteststring(String myteststring) {
    this.myteststring = myteststring;
  }
}
