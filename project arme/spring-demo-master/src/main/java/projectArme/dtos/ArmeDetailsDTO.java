package projectArme.dtos;

import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.UUID;

public class ArmeDetailsDTO {

    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String calibre;

    private int price;

    public ArmeDetailsDTO() {
    }

    public ArmeDetailsDTO(String name, String calibre, int price) {
        this.name = name;
        this.calibre = calibre;
        this.price = price;
    }

    public ArmeDetailsDTO(UUID id, String name, String calibre, int price) {
        this.id = id;
        this.name = name;
        this.calibre = calibre;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getCalibre() {
        return calibre;
    }

    public void setCalibre(String calibre) {
        this.calibre = calibre;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArmeDetailsDTO that = (ArmeDetailsDTO) o;
        return price == that.price &&
                Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(calibre, that.calibre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, calibre, price);
    }
}
