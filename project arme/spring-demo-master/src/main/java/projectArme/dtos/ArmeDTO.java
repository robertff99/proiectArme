package projectArme.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

public class ArmeDTO extends RepresentationModel<PersonDTO> {
    private UUID id;
    private String name;
    private String calibre;
    private int price;

    public ArmeDTO() {
    }

    public ArmeDTO(UUID id, String name,String calibre, int price) {
        this.id = id;
        this.name = name;
        this.calibre=calibre;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }



    public String getCalibre() {
        return calibre;
    }

    public void setCalibre(String calibre) {
        this.calibre = calibre;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ArmeDTO armeDTO = (ArmeDTO) o;
        return price == armeDTO.price &&
                Objects.equals(id, armeDTO.id) &&
                Objects.equals(name, armeDTO.name) &&
                Objects.equals(calibre, armeDTO.calibre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, calibre, price);
    }
}
