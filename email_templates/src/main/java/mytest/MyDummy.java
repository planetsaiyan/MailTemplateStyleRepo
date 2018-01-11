package mytest;

public class MyDummy {
  private String name;
  private String myOrange = "orange";

  public MyDummy(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public String getMyOrange() {
    return myOrange;
  }

  public void setMyOrange(String myOrange) {
    this.myOrange = myOrange;
  }

  public void setName(String name) {
    this.name = name;

  }
}
