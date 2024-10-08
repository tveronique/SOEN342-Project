public class Administrator extends Person{
    public static Administrator admin;

    private Administrator(String n, long pn, String pw){
        super();
        setName(n);
        setPhoneNumber(pn);
        setPassword(pw);
    }

    public static synchronized Administrator getAdmin(String n, long pn, String pw){
        if(admin == null){
            admin = new Administrator(n, pn, pw);
        }
        return admin;
    }
}