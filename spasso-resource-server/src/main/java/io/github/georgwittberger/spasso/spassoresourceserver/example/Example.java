package io.github.georgwittberger.spasso.spassoresourceserver.example;

public class Example {
    private String text;

    public Example() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Example text(String text) {
        this.text = text;
        return this;
    }
}
