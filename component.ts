import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

export interface ComponentArgs {
    length: number;
}

export class Component extends pulumi.ComponentResource {
    public readonly PetName: pulumi.Output<string>;
    constructor(name: string, args: ComponentArgs, opts?: pulumi.ComponentResourceOptions) {
        super("x:index:component", name, args, opts);

        const mypet = new random.RandomPet(`${name}-pat`, {
            length: args.length
        }, {parent: this});

        this.PetName = mypet.id;

        this.registerOutputs({
            "PetName": this.PetName
        })
    }
}